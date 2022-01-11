///////////////////////////////
// on load
///////////////////////////////
if (!isAuthorized()) {
    window.location.href = "../../auth/s2s/auth.html"
}


//////////////////////////////
// UI event handlers
//////////////////////////////
document.getElementById('logout').addEventListener("click", () => logout(), false);

document.getElementById('get-call-recordings').addEventListener("click", onGetCallRecordings, false);
document.getElementById('get-call-recordings-archive').addEventListener("click", onGetCallRecordingsArchive, false);
document.getElementById('get-call-recording-content').addEventListener("click", onGetCallRecordingContent, false);


document.getElementById('clearLog').addEventListener("click", () => document.getElementById('out').innerHTML = '', false);

///////////////////////////////
// Meeting functions
///////////////////////////////
function onGetCallRecordings() {
    let uuid =  document.getElementById("unified-user-id").value;
    getCallRecs(uuid).then((response) => {
        log(response);
    }).catch((error) => {
        log("Get Call Recordings failed! " + error);
    });
}

function onGetCallRecordingsArchive() {
    let uuid =  document.getElementById("unified-user-id").value;
    let ids = document.getElementById("ids").value.split(/\s*,\s*/);

    getCallRecsArchive(uuid, ids).then((response) => {
        let dataUrl = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = ids + ".zip";
        a.click();
    }).catch((error) => {
        log("Get Call Recordings Archive failed! " + error);
    });
}

function onGetCallRecordingContent() {
    let uuid =  document.getElementById("unified-user-id").value;
    let id = document.getElementById("call-recording-id").value;

    getCallRecsContent(uuid, id).then((response) => {
        let dataUrl = window.URL.createObjectURL(response);
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = id + ".mp3";
        a.click();
    }).catch((error) => {
        log("Get Call Recording Content failed! " + error);
    });
}