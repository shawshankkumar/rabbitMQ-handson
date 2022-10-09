import { config } from "dotenv";
config();
import { connect } from "amqplib";

const URL = `amqp://${process.env.User}:${process.env.Password}@${process.env.IP}:${process.env.Port}/${process.env.vHost}`;
const queue = process.env.Queue;

(async () => {
    try {
        const channel = await (await connect(URL)).createChannel();
        await channel.assertQueue(queue);
        const sent = channel.sendToQueue(
            queue,
            Buffer.from("Ruddha sad life 3")
        );
        console.log(sent);
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(-1);
    }
})();
