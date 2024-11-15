# Sistema de Monitoramento de Temperatura e Umidade com Raspberry Pi

## Descrição
Este projeto é um sistema de monitoramento de temperatura e umidade desenvolvido para aplicações em IoT. Ele utiliza um sensor DHT11 conectado a um Raspberry Pi 3 Model B+ para realizar leituras periódicas, enviar dados para um servidor via MQTT e disparar alertas por e-mail quando os limites definidos forem excedidos. O sistema inclui um buzzer para notificação sonora local e suporta controle remoto via protocolo TCP/IP.

## Funcionalidade
1. **Monitoramento em Tempo Real**: Mede a temperatura e umidade a cada 10 segundos.
2. **Notificações de Alerta**: Envia e-mails automáticos quando os limites de temperatura ou umidade são ultrapassados.
3. **Controle Sonoro**: Um buzzer é ativado localmente em situações de alerta.
4. **Comunicação IoT**: Dados são transmitidos para um broker MQTT para visualização e controle remoto.
5. **Personalização**: Limites de temperatura e umidade podem ser ajustados no código-fonte.

## Software Desenvolvido
O sistema foi implementado em **Node.js**, utilizando as seguintes bibliotecas principais:
- `node-dht-sensor`: para leitura de dados do sensor DHT11.
- `onoff`: para controle do buzzer via GPIO.
- `mqtt`: para comunicação com o broker HiveMQ.
- `nodemailer`: para envio de e-mails de alerta.

### Estrutura do Código
- **`index.js`**: Script principal que coordena as leituras, ações e notificações e publicação de dados no broker MQTT.
- **`leituraMQTT.js`**: Script onde é possível ler o tópico onde se está inscrito no broker MQTT em tempo real.
- **Gerenciamento de Hardware**: É importante que esteja sendo utilizado os GPIOs no local certo para interagir com o sensor e o buzzer corretamente.

## Hardware Utilizado
1. **Raspberry Pi 3 Model B+**: Placa principal do sistema.
2. **Sensor DHT11**: Realiza leituras de temperatura e umidade.
3. **Buzzer Passivo**: Ator sonoro para alertas locais.
4. **Cabos Jumper Fêmea para Fêmea**: Para conexão entre os componentes.
5. **Conexão Wi-Fi**: Proporciona comunicação remota com o broker MQTT e envio de e-mails.
6. **Teclado e Mouse**: Para configuração inicial.
7. **Cabo HDMI**: Para visualização local da interface no Raspberry Pi em qualquer monitor/televisão que suporte o mesmo.

## Interfaces, Protocolos e Módulos de Comunicação
1. **MQTT**: Comunicação IoT baseada no broker HiveMQ, operando no modelo publish/subscribe.
   - Tópicos:
     - `detector/telaAviso`: Para envio de mensagens de alerta e status do sistema.

2. **E-mail**: Configurado com o serviço SMTP do Gmail para envio de alertas.

3. **Controle via Internet (TCP/IP)**: As mensagens MQTT podem ser acessadas remotamente, permitindo monitoramento e controle à distância.

## Requisitos para Reproduzir o Projeto
### Software
- Node.js (versão 16).
- Dependências do Node.js listadas no arquivo `package.json`.

### Hardware
- Um Raspberry Pi 3 Model B+ ou superior.
- Sensor DHT11.
- Buzzer passivo.
- Conexão à internet (via Wi-Fi).

## Como Reproduzir
1. **Configuração do Ambiente**:
   - Instale Node.js e as dependências listadas no arquivo `package.json`.
   - Configure o broker MQTT e o serviço de e-mail com suas credenciais.

2. **Montagem do Hardware**:
   - Conecte o sensor DHT11 ao Raspberry Pi (pinos GPIO conforme especificado no código).
   - Conecte o buzzer ao pino GPIO especificado.

3. **Execução do Código**:
   - Suba o script `index.js` no Raspberry Pi e execute o mesmo no terminal.
   - Acompanhe os dados no broker MQTT ou no console do Raspberry Pi.

4. **Monitoramento e Controle Remoto**:
   - Verifique alertas via e-mail.
   - Controle os tópicos no broker MQTT para interação remota.

## Conclusão
Este projeto mostrou como é possível integrar sensores e atuadores ao Raspberry Pi para criar um sistema de monitoramento eficiente e conectado. Usando um sensor DHT11, um buzzer e protocolos como MQTT e e-mail, foi possível construir uma solução prática para monitorar temperatura e umidade, com notificações em tempo real e controle remoto. Apesar de alguns desafios, como ajustar o hardware e configurar as ferramentas de comunicação, o sistema alcançou seus objetivos principais. Além de ser funcional, ele oferece uma base sólida para futuras melhorias, como incluir sensores mais potentes.
