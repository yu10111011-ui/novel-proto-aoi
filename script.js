/**
 * 氷のティータイム — 短いビジュアルノベル
 * キャラ: セレス（銀髪ツインテのお姫様）
 * 素材: お姫様キャラBot納品（通常／微笑／困り＋城広間／バラ園／お茶会）
 */
(function () {
  "use strict";

  const IMG = {
    hall: "img/bg-hall.jpg",
    rose: "img/bg-rose.jpg",
    tea: "img/bg-tea.jpg",
    normal: "img/sprite-normal.jpg",
    smile: "img/sprite-smile.jpg",
    worried: "img/sprite-worried.jpg",
  };

  const scenes = {
    start: {
      bg: "hall",
      lines: [
        { name: null, text: "白い城の広間。窓から差し込む光が、床の金の模様を淡く照らしている。", expr: null },
        { name: "セレス", text: "……あ。ようこそ、お客様。わたしはセレス。このお城の……まだ小さな姫です。", expr: "normal" },
        { name: "セレス", text: "きょうはお天気もいいし、せっかく来てくださったのですから、ご案内しますね。", expr: "smile" },
        { name: "セレス", text: "どちらがいいですか？　バラの庭を散歩するか、お庭でお茶にするか。", expr: "normal" },
      ],
      choices: [
        { label: "「バラ園を散歩しよう」", next: "routeRose" },
        { label: "「お茶会にしよう」", next: "routeTea" },
      ],
    },

    routeRose: {
      bg: "rose",
      lines: [
        { name: null, text: "バラ園の小道。白い東屋のまわりに、ピンクの花がこぼれている。", expr: null },
        { name: "セレス", text: "ここ、わたしの好きな場所なんです。おうさぎのユキも、よく一緒に来ます。", expr: "smile" },
        { name: "セレス", text: "……でも、さっきから小さな氷の魔法が、うまくまとまらなくて。", expr: "worried" },
        { name: "セレス", text: "大丈夫。あなたがそばにいてくれるなら、光だけでも綺麗に見えるはずです。", expr: "smile" },
        { name: "セレス", text: "また来てくださいね。次は、ユキにも紹介しますから。", expr: "normal" },
      ],
      ending: {
        label: "ENDING A",
        title: "バラと氷の午後",
        message: "バラの香りと、セレスの小さな魔法が残った。\nお城の庭は、またあなたを待っている。",
      },
    },

    routeTea: {
      bg: "tea",
      lines: [
        { name: null, text: "バラのアーチの下。レースのテーブルに、紅茶とマカロンが並ぶ。", expr: null },
        { name: "セレス", text: "ふふ。お茶会は得意なんです。砂糖は……少し多めがいいですか？", expr: "smile" },
        { name: "セレス", text: "あ、カップが熱くなりすぎたかも……氷の魔法、ちょっとだけ。", expr: "worried" },
        { name: "セレス", text: "はい、ちょうどいい温度。あなたと飲む紅茶は、いつもより甘い気がします。", expr: "smile" },
        { name: "セレス", text: "また空いた時間に、ここに来てください。席、空けておきますから。", expr: "normal" },
      ],
      ending: {
        label: "ENDING B",
        title: "氷砂糖のティータイム",
        message: "湯気の向こうで、セレスは小さく手を振った。\n次のお茶会の約束だけが、残っている。",
      },
    },
  };

  const titleScreen = document.getElementById("title-screen");
  const gameScreen = document.getElementById("game-screen");
  const endingScreen = document.getElementById("ending-screen");
  const btnStart = document.getElementById("btn-start");
  const btnRetry = document.getElementById("btn-retry");
  const stage = document.getElementById("stage");
  const bgEl = document.getElementById("bg");
  const spriteEl = document.getElementById("sprite");
  const namePlate = document.getElementById("name-plate");
  const dialogueText = document.getElementById("dialogue-text");
  const continueHint = document.getElementById("continue-hint");
  const choicesEl = document.getElementById("choices");
  const endingLabel = document.getElementById("ending-label");
  const endingTitle = document.getElementById("ending-title");
  const endingMessage = document.getElementById("ending-message");

  let currentSceneId = "start";
  let lineIndex = 0;
  let typing = false;
  let typeTimer = null;
  let fullText = "";
  let awaitingChoice = false;
  let showingEnding = false;
  const TYPE_SPEED = 26;

  function showScreen(el) {
    [titleScreen, gameScreen, endingScreen].forEach((s) => s.classList.remove("active"));
    el.classList.add("active");
  }

  function clearTypeTimer() {
    if (typeTimer) clearInterval(typeTimer);
    typeTimer = null;
    typing = false;
  }

  function setVisuals(scene, line) {
    const bgKey = scene.bg || "hall";
    bgEl.src = IMG[bgKey];
    bgEl.classList.remove("hidden");
    if (line && line.expr && IMG[line.expr]) {
      spriteEl.src = IMG[line.expr];
      spriteEl.classList.remove("hidden");
    } else {
      spriteEl.classList.add("hidden");
    }
  }

  function setName(name) {
    if (!name) {
      namePlate.textContent = "——";
      namePlate.classList.add("narrator");
    } else {
      namePlate.textContent = name;
      namePlate.classList.remove("narrator");
    }
  }

  function typeLine(text) {
    clearTypeTimer();
    fullText = text;
    dialogueText.textContent = "";
    continueHint.classList.add("hidden");
    typing = true;
    let i = 0;
    typeTimer = setInterval(() => {
      i += 1;
      dialogueText.textContent = fullText.slice(0, i);
      if (i >= fullText.length) {
        clearTypeTimer();
        continueHint.classList.remove("hidden");
      }
    }, TYPE_SPEED);
  }

  function skipTyping() {
    if (!typing) return;
    clearTypeTimer();
    dialogueText.textContent = fullText;
    continueHint.classList.remove("hidden");
  }

  function hideChoices() {
    choicesEl.classList.add("hidden");
    choicesEl.innerHTML = "";
    awaitingChoice = false;
  }

  function showChoices(choices) {
    awaitingChoice = true;
    continueHint.classList.add("hidden");
    choicesEl.innerHTML = "";
    choices.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = c.label;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        hideChoices();
        goToScene(c.next);
      });
      choicesEl.appendChild(btn);
    });
    choicesEl.classList.remove("hidden");
  }

  function showEnding(ending) {
    showingEnding = true;
    hideChoices();
    endingLabel.textContent = ending.label;
    endingTitle.textContent = ending.title;
    endingMessage.textContent = ending.message;
    showScreen(endingScreen);
  }

  function presentCurrentLine() {
    const scene = scenes[currentSceneId];
    if (!scene) return;
    if (lineIndex >= scene.lines.length) {
      if (scene.choices) {
        showChoices(scene.choices);
        return;
      }
      if (scene.ending) {
        showEnding(scene.ending);
        return;
      }
      return;
    }
    const line = scene.lines[lineIndex];
    setVisuals(scene, line);
    setName(line.name);
    typeLine(line.text);
  }

  function advance() {
    if (showingEnding || awaitingChoice) return;
    if (typing) {
      skipTyping();
      return;
    }
    lineIndex += 1;
    presentCurrentLine();
  }

  function goToScene(id) {
    currentSceneId = id;
    lineIndex = 0;
    hideChoices();
    presentCurrentLine();
  }

  function startGame() {
    showingEnding = false;
    showScreen(gameScreen);
    goToScene("start");
  }

  function backToTitle() {
    clearTypeTimer();
    hideChoices();
    showingEnding = false;
    dialogueText.textContent = "";
    showScreen(titleScreen);
  }

  btnStart.addEventListener("click", (e) => {
    e.stopPropagation();
    startGame();
  });
  btnRetry.addEventListener("click", (e) => {
    e.stopPropagation();
    backToTitle();
  });
  stage.addEventListener("click", () => advance());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight" || e.key === "z" || e.key === "Z") {
      if (titleScreen.classList.contains("active")) {
        startGame();
        return;
      }
      if (endingScreen.classList.contains("active")) return;
      e.preventDefault();
      advance();
    }
  });
})();
