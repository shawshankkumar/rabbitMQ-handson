import { config } from "dotenv";
config();
import { connect } from "amqplib";

const URL = `amqp://${process.env.User}:${process.env.Password}@${process.env.IP}:${process.env.Port}/${process.env.vHost}`;
const queue = "jack-test";

(async () => {
    try {
        const channel = await (await connect(URL)).createChannel();
        channel.consume(queue, (message) => {
            console.log("Message: ", message.content.toString());
            channel.ack(message);
        });
    } catch (err) {
        console.log(err);
        process.exit(-1);
    }
})();
