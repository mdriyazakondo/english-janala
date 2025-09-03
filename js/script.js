function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displyLessons(json.data));
};

const removeBtn = () => {
  const activeBtn = document.querySelectorAll(".lesson-btn");
  // console.log(activeBtn);
  activeBtn.forEach((btn) => btn.classList.remove("active"));
};

const wordSpinner = (stutas) => {
  if (stutas === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLevelWord = (id) => {
  wordSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeBtn();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displyLevelWords(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayLoadWordDetals(data.data);
};

/**
 * "data": {
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার",
    "level": 1,
    "sentence": "The kids were eager to open their gifts.",
    "points": 1,
    "partsOfSpeech": "adjective",
    "synonyms": [
      "enthusiastic",
      "excited",
      "keen"
    ],
    "id": 5
  }
*/

const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class='btn'>${el}</span>`);
  return htmlElements.join(" ");
};

const displayLoadWordDetals = (detalis) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `                  
          <div>
            <h2 class="text-2xl font-bold">
              ${detalis.word} ( <i class="fa-solid fa-microphone-lines"></i>:${
    detalis.pronunciation
  })
            </h2>
          </div>
          <div>
            <h2 class="font-bold">EMeaning</h2>
            <p>${detalis.meaning}</p>
          </div>
          <div>
            <h2 class="font-bold">Example</h2>
            <p>${detalis.sentence}</p>
          </div>
          <div>
            <h3>সমার্থক শব্দ গুলো</h3>
              <div>${createElements(detalis.synonyms)}</div>
          </div>
  `;
  document.getElementById("word_model").showModal();
};

const displyLevelWords = (words) => {
  const wordContainer = document.getElementById("word-container");

  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
           <div class="text-center col-span-full space-y-2 py-10 font-bangla">
               <img class='mx-auto' src="../assets/alert-error.png" alt="" />
                <p class=" text-sm font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
            </div>
    `;
    wordSpinner(false);
    return;
  }

  words.forEach((item) => {
    const cart = document.createElement("div");
    cart.innerHTML = `
      <div class="text-center py-10 px-10 rounded-xl bg-white space-y-4">
        <h2 class="text-2xl font-bold">${
          item.word ? item.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          item.meaning ? item.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      item.pronunciation ? item.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</div>
        <div class="flex items-center justify-between">
          <button  onclick="loadWordDetails(${
            item.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50] text-xl"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick="pronounceWord('${
            item.word
          }')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50] text-xl"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(cart);
  });
  wordSpinner(false);
};

const displyLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <div class=''>
                <button id="lesson-btn-${lesson.level_no}" onclick='loadLevelWord(${lesson.level_no})' class='btn btn-outline btn-primary lesson-btn'><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
            </div>
    `;
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  // removeBtn();
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWord = data.data;
      const filterWord = allWord.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      displyLevelWords(filterWord);
    });
});
