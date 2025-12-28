const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById('result');
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            const audioData = data[0].phonetics.find(p => p.audio !== "");

            // 1. Inject the HTML (Notice I removed onclick from the button)
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button id="sound-btn">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || ""}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <div class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </div>`;

            // 2. Set the audio source
            if (audioData && audioData.audio) {
                let audioUrl = audioData.audio.startsWith('http') ?
                    audioData.audio :
                    "https:" + audioData.audio;
                sound.setAttribute("src", audioUrl);

                // 3. Manually attach the listener to the NEWLY created button
                document.getElementById("sound-btn").addEventListener("click", () => {
                    sound.play();
                });
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        });
});