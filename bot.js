//importing libs
const easyvk = require("easyvk"); 

easyvk({
  token:
    "//here lies community token",
  reauth: true,
  v: "5.103" 
}).then(async vk => {
  let connection = await vk.bots.longpoll.connect(); // connecting to longpoll api
  connection.on("message_new", async msg => { 
    if (
      msg.message &&
      msg.message.action &&
      msg.message.action.type === "chat_invite_user" && // starting to spam when invited to chat
      msg.message.action.member_id === -vk.session.group_id // checking if the group is not who sended message
    ) {
      function spam(length) { // generating spam text
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

      async function sendmessage(peerId) { // function to send message (sorry)
        return vk.call("messages.send", {
          peer_id: peerId,
          random_id: easyvk.randomId(),
          message: spam(2000)
        });
      }
      setInterval(() => {
        sendmessage(msg.message.peer_id);
      }, 500); // SORRY
    }
  });
});
