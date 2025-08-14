const temposFilmes = {
  "Captain America: The First Avenger": 124,
  "Captain Marvel": 123,
  "Iron Man": 126,
  "Iron Man 2": 124,
  "The Incredible Hulk": 112,
  "Thor": 115,
  "The Avengers": 143,
  "Thor: The Dark World": 112,
  "Iron Man 3": 130,
  "Captain America: The Winter Soldier": 136,
  "Guardians of the Galaxy": 122,
  "Guardians of the Galaxy Vol. 2": 136,
  "Avengers: Age of Ultron": 141,
  "Ant-Man": 117,
  "Captain America: Civil War": 147,
  "Black Widow": 134,
  "Spider-Man Homecoming": 133,
  "Doctor Strange": 115,
  "Black Panther": 134,
  "Thor: Ragnarok": 130,
  "Ant-Man and The Wasp": 118,
  "Avengers: Infinity War": 149,
  "Avengers: Endgame": 181,
  "Spider-Man: Far From Home": 129,
  "Shang-Chi and the Legend of the Ten Rings": 132,
  "Eternals": 157,
  "Spider-Man: No Way Home": 148,
  "Doctor Strange in the Multiverse of Madness": 126,
  "Thor: Love and Thunder": 119,
  "Black Panther: Wakanda Forever": 161,
  "Ant-Man and The Wasp: Quantumania": 125,
  "Guardians of the Galaxy Vol. 3": 150,
  "The Marvels": 105,
  "Deadpool and Wolverine": 128,
  "Captain America: Brave New World": 118,
  "Thunderbolts": 126,
  "The Fantastic Four: First Steps": 115
};

function marcarQuadradinho(filme) {
  const quadradinho = filme.querySelector(".quadradinho");
  const nome = filme.dataset.nome;
  let progresso = JSON.parse(localStorage.getItem("filmesAssistidos") || "{}");

  if (progresso[nome]?.assistido) {
    quadradinho.innerHTML = "";
    delete progresso[nome];
  } else {
    quadradinho.innerHTML = "✓";
    progresso[nome] = {
      assistido: true,
      data: new Date().toLocaleDateString("pt-BR")
    };
  }

  localStorage.setItem("filmesAssistidos", JSON.stringify(progresso));
  atualizarTempoRestante();
  filmeRestante();
}

function atualizarTempoRestante() {
  const progresso = JSON.parse(localStorage.getItem("filmesAssistidos") || "{}");
  let restante = 0;
  let restanteH = 0;

  for (const nome in temposFilmes) {
    if (!progresso[nome]?.assistido) {
      restante += temposFilmes[nome];
    }
  }

  restanteH = restante / 60; 

  const div = document.getElementById("tempo-restante");
  div.textContent = `Faltam ${restante} minutos ou ${restanteH.toFixed(1)} horas de filmes`;
}

function filmeRestante() {
  const progresso = JSON.parse(localStorage.getItem("filmesAssistidos") || "{}");
  let restanteFilme = Object.keys(temposFilmes).length;

  for (const nome in temposFilmes) {
    if (progresso[nome]?.assistido) {
      restanteFilme -= 1;
    }
  }

  const div2 = document.getElementById("filme-restante");
  if (div2) {
    div2.textContent = `Falta assistir ${restanteFilme} filmes`;
  }
}

function carregarEstados() {
  const progresso = JSON.parse(localStorage.getItem("filmesAssistidos") || "{}");

  document.querySelectorAll(".filme").forEach(filme => {
    const nome = filme.dataset.nome;
    const quadradinho = filme.querySelector(".quadradinho");

    if (progresso[nome]?.assistido) {
      quadradinho.innerHTML = "✓";
    }

    quadradinho.addEventListener("click", () => {
      marcarQuadradinho(filme);
    });
  });

  atualizarTempoRestante();
}

function mostrarReview(id) {
  const review = document.getElementById(id);
  review.style.display = review.style.display === "block" ? "none" : "block";
}

carregarEstados();
filmeRestante();


function mostrarLog() {
  const progresso = JSON.parse(localStorage.getItem("filmesAssistidos")) || {};
  let log = "Filmes assistidos:\n\n";
  let encontrou = false;

  for (const nome in progresso) {
    if (progresso[nome]?.assistido) {
      log += `- ${nome} (visto em ${progresso[nome].data})\n`;
      encontrou = true;
    }
  }

  if (!encontrou) {
    log = "Nenhum filme assistido ainda.";
  }

  alert(log);
}

