(function () {
  "use strict";
  const scenes = {
    start: {
      lines: [
        { name: null, text: "夜のネオン街。遠いライブハウスから、淡い電子音が漏れてくる。" },
        { name: null, text: "あなたは迷い込んだように、ステージ袖の扉を開けた。" },
        {
          name: "アオイ",
          text: "……あ。観客さんは、まだ入ってこない時間だよ？",
        },
        {
          name: "アオイ",
          text: "わたし、アオイ・ミズキ。デジタルの海から来た歌姫……って、自分で言うのも変かな。",
        },
        {
          name: "アオイ",
          text: "今日は大事な初ライブなんだ。でもね——曲の最後、まだ決めきれなくて。",
        },
        {
          name: "アオイ",
          text: "もしよかったら……どっちの終わり方がいいか、聞いてくれる？",
        },
      ],
      choices: [
        {
          label: "「みんなと繋がる、明るいエンディングがいい」",
          next: "routeA",
        },
        {
          label: "「一人きりの夜空に溶ける、静かなエンディングがいい」",
          next: "routeB",
        },
      ],
    },
    routeA: {
      lines: [
        {
          name: "アオイ",
          text: "うん……繋がるほう、か。ツインテールが、ちょっと弾んだ気がする。",
        },
        {
          name: "アオイ",
          text: "じゃあ最後は、みんなの声と重ねて——「ありがとう」って歌おう。",
        },
        { name: null, text: "照明がシアンに染まり、客席から拍手が雪のように降る。" },
        {
          name: "アオイ",
          text: "ねえ、あなたのおかげで……わたし、ちゃんと「ここにいる」って感じられたよ。",
        },
        {
          name: "アオイ",
          text: "次の曲も、一緒に聴いてくれる？　約束、だよ。",
        },
      ],
      ending: {
        label: "ENDING A",
        title: "レゾナンス・リンク",
        message:
          "歌は街のネオンと響き合い、消えない光になった。\nアオイ・ミズキは、あなたの選択を忘れない。",
      },
    },
    routeB: {
      lines: [
        {
          name: "アオイ",
          text: "……静かなほう、ね。ちょっとだけ、胸がざわっとした。",
        },
        {
          name: "アオイ",
          text: "最後は音を薄くして、星みたいに溶けていく……そういう歌、好きなんだ。",
        },
        { name: null, text: "ステージのライトが落ち、窓の外にターコイズの夜空だけが残る。" },
        {
          name: "アオイ",
          text: "消えてもいい。消えたあとに、誰かの記憶に残れば——それで十分だよ。",
        },
        {
          name: "アオイ",
          text: "でも……あなたが覚えててくれたら、わたしはまた歌える気がする。",
        },
      ],
      ending: {
        label: "ENDING B",
        title: "サイレント・スカイ",
        message:
          "余韻だけがネオン街に残り、アオイの声は夜に溶けた。\nそれでも、どこかでまた会える気がする。",
      },
    },
  };
  const titleScreen = document.getElementById("title-screen");
  const gameScreen = document.getElementById("game-screen");
  const endingScreen = document.getElementById("ending-screen");
  const btnStart = document.getElementById("btn-start");
  const btnRetry = document.getElementById("btn-retry");
  const stage = document.getElementById("stage");
  const namePlate = document.getElementById("name-plate");
  const dialogueText = document.getElementById("dialogue-text");
  const continueHint = document.getElementById("continue-hint");
  const choicesEl = document.getElementById("choices");
  const sprite = document.getElementById("sprite");
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
  const TYPE_SPEED = 28;
  function showScreen(el) {
    [titleScreen, gameScreen, endingScreen].forEach((s) => s.classList.remove("active"));
    el.classList.add("active");
  }
  function clearTypeTimer() {
    if (typeTimer) {
      clearInterval(typeTimer);
      typeTimer = null;
    }
    typing = false;
  }
  function setName(name) {
    if (!name) {
      namePlate.textContent = "——";
      namePlate.classList.add("narrator");
      namePlate.classList.remove("hidden");
    } else {
      namePlate.textContent = name;
      namePlate.classList.remove("narrator", "hidden");
    }
  }
  function typeLine(text, onDone) {
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
        if (onDone) onDone();
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
    setName(line.name);
    sprite.classList.toggle("hidden", !line.name);
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
  stage.addEventListener("click", () => {
    advance();
  });
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
