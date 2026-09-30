/**
 * 氷のティータイム — 短いビジュアルノベル
 * キャラ: セレス（銀髪ツインテのお姫様）
 * 素材: お姫様キャラBot納品（通常／微笑／困り＋城広間／バラ園／お茶会）
 */
(function () {
  "use strict";

  const IMG = {
    hall: "data:image/jpeg;base64,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",
    rose: "data:image/jpeg;base64,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",
    tea: "data:image/jpeg;base64,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",
    normal: "data:image/jpeg;base64,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",
    smile: "data:image/jpeg;base64,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",
    worried: "data:image/jpeg;base64,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",
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
