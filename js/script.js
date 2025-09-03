const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displyLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displyLevelWords(data.data));
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
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50] text-xl"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50] text-xl"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(cart);
  });
};

const displyLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <div class=''>
                <button onclick='loadLevelWord(${lesson.level_no})' class='btn btn-outline btn-primary'><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
            </div>
    `;
    levelContainer.appendChild(btnDiv);
  }
};
loadLessons();
