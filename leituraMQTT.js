const mqtt = require('mqtt');


const client = mqtt.connect('mqtts://28e737ba652742dc87a3775f20eacb6e.s1.eu.hivemq.cloud:8883', {
	username: "hivemq.webclient.1731588031935",
	password: ">0DEc;:C6m1ObMsfl9!G"
	}); 

client.on('connect', () => {
    console.log("Conectado ao broker!");
    
   
    const topico = 'detector/telaAviso';
    client.subscribe(topico, (err) => {
        if (!err) {
            console.log(`Inscrito no tópico: ${topico}`);
        } else {
            console.log("Erro ao se inscrever no tópico:", err);
        }
    });
});


client.on('message', (topic, message) => {
    console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
});
