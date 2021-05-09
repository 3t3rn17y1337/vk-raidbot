const easyvk = require("easyvk"); 

easyvk({
  token:
    "//here lies community token",
  reauth: true,
  v: "5.103" 
}).then(async vk => {
  let connection = await vk.bots.longpoll.connect();
  connection.on("message_new", async msg => {
    if (
      msg.message &&
      msg.message.action &&
      msg.message.action.type === "chat_invite_user" &&
      msg.message.action.member_id === -vk.session.group_id
    ) {
      function makeid(length) {
        var result = [];
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}:;"|?><!@#$%^&*(_+)"}{}';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
          );
        }
        return result.join("");
      }
      console.log(makeid(5));

      async function sendHelloMessage(peerId) {
        return vk.call("messages.send", {
          peer_id: peerId,
          random_id: easyvk.randomId(),
          message: makeid(3500)
        });
      }
      setInterval(() => {
        sendHelloMessage(msg.message.peer_id);
      }, 5 * 100);
    }
  });
});
