const sensor = require("node-dht-sensor").promises;
const nodemailer = require("nodemailer");
const mqtt = require('mqtt');
const Gpio = require('onoff').Gpio;

const buzzer = new Gpio(539, 'out');

const client = mqtt.connect('mqtts://28e737ba652742dc87a3775f20eacb6e.s1.eu.hivemq.cloud:8883', {
    username: "hivemq.webclient.1731588031935",
    password: ">0DEc;:C6m1ObMsfl9!G"
}); 

const TEMP_LIMIT = 20;  
const HUMIDITY_LIMIT = 35;  

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    secure: true,
    port: 465,
    auth: {
        user: "umidadetemperatura@gmail.com",     
        pass: "blnxfhxzhpvwrvmn",                
    },
});

async function enviarEmailAlerta(mensagem) {
    const mailOptions = {
        from: "Umidadde Temperatura <umidadetemperatura@gmail.com>",
        to: "matheus.baganha2@gmail.com",
        subject: "Alerta de Temperatura/Umidade",
        text: mensagem,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("E-mail de alerta enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}

async function monitorarSensor() {
    const sensorStart = Date.now();
    try {
        const { temperature, humidity } = await sensor.read(11, 4); 
        const sensorEnd = Date.now();
        console.log(`Temperatura: ${temperature}°C, Umidade: ${humidity}%`);
        console.log(`Tempo de resposta do sensor: ${sensorEnd - sensorStart} ms`);

        if (temperature > TEMP_LIMIT) {
            await enviarEmailAlerta(`Alerta! A temperatura excedeu o limite: ${temperature}°C`);
            publicarMensagem('detector/telaAviso', `Alerta! A temperatura excedeu o limite: ${temperature}°C`);
            ligarBuzzer();
            return;
        }

        if (humidity > HUMIDITY_LIMIT) {
            await enviarEmailAlerta(`Alerta! A umidade excedeu o limite: ${humidity}%`);
            publicarMensagem("detector/telaAviso", `Alerta! A umidade excedeu o limite: ${humidity}%`);
            ligarBuzzer();
            return;
        }

        desligarBuzzer();
        publicarMensagem('detector/telaAviso', `A temperatura e umidade estão em níveis ideais.`);
    } catch (error) {
        console.error("Erro ao ler o sensor:", error);
    }
}

function publicarMensagem(topico, mensagem) {
    client.publish(topico, mensagem, (err) => {
        if (err) {
            console.error("Erro ao publicar mensagem:", err);
        } else {
            console.log(`Mensagem "${mensagem}" publicada no tópico "${topico}"`);
        }
    });
}

function ligarBuzzer() {
    const buzzerStart = Date.now();
    buzzer.writeSync(1);
    const buzzerEnd = Date.now();
    console.log(`Tempo de resposta do atuador (buzzer ligado): ${buzzerEnd - buzzerStart} ms`);
}

function desligarBuzzer() {
    const buzzerStart = Date.now();
    buzzer.writeSync(0);
    const buzzerEnd = Date.now();
    console.log(`Tempo de resposta do atuador (buzzer desligado): ${buzzerEnd - buzzerStart} ms`);
}

setInterval(monitorarSensor, 10000);
