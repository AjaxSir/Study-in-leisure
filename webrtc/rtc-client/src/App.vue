<!--
 * @Date: 2025-01-09 17:47:43
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-13 18:13:23
 * @Description: 
-->
<template>
  <div class="content">
    <video class="localVideo" ref="localVideoStream"></video>
    <video class="remoteVideo" ref="remoteVideoStream"></video>
    <br />
    <button v-if="!isCalling" @click="handleCall">呼叫</button>
    <button v-if="called && isCalling" @click="handleUp">接听</button>
    <button v-if="isCalling || caller" @click="handleDown">挂断</button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import io from "socket.io-client";
const socket = ref();
const localVideoStream = ref<HTMLVideoElement | null>(null);
const remoteVideoStream = ref<HTMLVideoElement | null>(null);
const caller = ref(false);
const called = ref(false);
const roomId = ref<string>("");
const isCalling = ref(false); // 是否在呼叫中
const stream = ref<MediaStream | null>();
const peer = ref<any>();
const handleCall = async() => {
  caller.value = true;
  called.value = false;
  isCalling.value = true;
  await getLocalVideoStream();
  socket.value.emit("callRemote", roomId.value);
};
const handleUp = async () => {
  caller.value = false;
  called.value = true;
  peer.value = new RTCPeerConnection();
  socket.value.emit("accept", roomId.value);
  await getLocalVideoStream();
  peer.value.addStream(stream.value);
};
const handleDown = () => {
  socket.value.emit('handleDown')
  stream.value?.getTracks().forEach(track => track.stop())
};
const getLocalVideoStream = async () => {
 await navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((_stream) => {
      localVideoStream.value!.srcObject = _stream;
      localVideoStream.value?.play();
      stream.value = _stream;
    })
    .catch((error) => {
      console.error("Error getting user media", error);
    });
};
onMounted(() => {
  const api = import.meta.env.MODE === 'production' ? 'https://babysyl.top' : "http://localhost:3000"
  socket.value = io(api);
  console.log(api, `<===================api2`)
  socket.value.on("connectionSuccess", (_roomId: string) => {
    console.log("连接成功");
    roomId.value = _roomId;
  });
  socket.value.emit("joinRoom", roomId.value);
  socket.value.on("someOneJoinRoom", () => {
    console.log("有人加入房间:" + Math.random());
  });
  socket.value.on("callRemote", () => {
    isCalling.value = true;
    called.value = true;
    console.log("有人来电");
  });
  socket.value.on("accept", async () => {
    if (caller.value) {
      peer.value = new RTCPeerConnection();

      // peer.value.addStream(stream.value);

      peer.value.onicecandidate = (event: any) => {
        if (event.candidate) {
          socket.value.emit("iceCandidate", {
            candidate: event.candidate,
          });
        }
      };

      peer.value.onaddstream = (event: any) => {
        remoteVideoStream.value!.srcObject = event.stream;
        remoteVideoStream.value!.play();
      };

      const offer = await peer.value.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      });
      peer.value.setLocalDescription(offer);
      socket.value.emit("sendOffer", {
        offer,
        roomId: roomId.value,
      });
    }
  });
  socket.value.on("sendOffer", async (offer: any) => {
    if (called.value) {
      const sessionDescription = new RTCSessionDescription({
        type: "offer", // 或 'answer'
        sdp: offer.sdp,
      });
      peer.value.setRemoteDescription(sessionDescription);
      const answer = await peer.value.createAnswer();
      peer.value.setLocalDescription(answer);
      socket.value.emit("sendAnswer", answer);
    }
  });
  socket.value.on("sendAnswer", (answer: any) => {
    if (caller.value) {
      const sessionDescription = new RTCSessionDescription({
        type: "answer",
        sdp: answer.sdp,
      });
      peer.value.setRemoteDescription(sessionDescription);
    }
  });
  socket.value.on("iceCandidate", async (candidate: any) => {
    if (peer.value) {
      await peer.value.addIceCandidate(new RTCIceCandidate(candidate.candidate));
    }
  });
  socket.value.on("handleDown", () => {
    console.log("对方已��断");
    stream.value?.getTracks().forEach(track => track.stop())
        caller.value = false;
        called.value = false;
        isCalling.value = false;
  })
});
</script>

<style scoped lang="scss">
.content {
  @include responseTo("phone") {
    width: 200px;
    background-color: red;
  }
}
</style>
