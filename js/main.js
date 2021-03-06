// Card animation
const wraps = document.querySelectorAll(".card-wrap");

wraps.forEach((wrap) => {
  const card = wrap.querySelector(".card");
  const cardScreen = card.querySelector(".card-screen");
  const screen = cardScreen.querySelector(".card-screen-img");
  const heading = card.querySelector("h3");
  const icons = card.querySelector(".icons");
  const button = card.querySelector("button");

  // Moving animation
  wrap.addEventListener("mousemove", (e) => {
    // console.log(e)
    let xAxis = (window.innerWidth / 2 - e.clientX) / 50;
    let yAxis = (window.innerHeight / 2 - e.clientY) / 50;

    card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  });

  // Pop out on mouse enter
  wrap.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    // Pop out
    cardScreen.style.transform = "translateZ(90px)";
    heading.style.transform = "translateZ(80px)";
    icons.style.transform = "translateZ(60px)";
    button.style.transform = "translateZ(80px)";
    // Screen scroll, varied based on screen length
    screen.classList.contains("bc")
      ? (screen.style.transform = "translateY(-800px)")
      : null;
    screen.classList.contains("spartan")
      ? (screen.style.transform = "translateY(-750px)")
      : null;
    screen.classList.contains("pfs")
      ? (screen.style.transform = "translateY(-400px)")
      : null;
  });

  // Pop in on mouse leave
  wrap.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";
    // Pop in
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    cardScreen.style.transform = "translateZ(0px)";
    heading.style.transform = "translateZ(0px)";
    icons.style.transform = "translateZ(0px)";
    button.style.transform = "translateZ(0px)";
    // Screen un-scroll
    screen.style.transform = "translateY(0px)";
  });
});

// Language icons hover
const iconContainers = document.querySelectorAll(".icons");
iconContainers.forEach((container) => {
  const icons = container.querySelectorAll("span");
  icons.forEach((icon) => {
    icon.addEventListener("mouseenter", (e) => {
      icon.style.transform = "scale(1.05)";
    });
    icon.addEventListener("mouseleave", (e) => {
      icon.style.transform = "scale(1)";
    });
  });
});

// Fullpage
new fullpage("#fullpage", {
  //options here
  licenseKey: "1F447BB1-4D004BDD-B7EFE2DF-8C8A359D",
  autoScrolling: true,
  navigation: false,
  anchors: ["top", "projects", "skills"],
  resetSliders: true,
  resetSlidersKey: "bGFyb2NxdWUuZGV2X2w1N2NtVnpaWFJUYkdsa1pYSno4Nmw=",
  controlArrows: false,
});

// Observers
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const slideIn = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    let leftSlideys = entry.target.querySelectorAll(".left");
    let rightSlideys = entry.target.querySelectorAll(".right");
    if (entry.intersectionRatio > 0) {
      leftSlideys.forEach((slidey) => {
        let length = getRandomArbitrary(1, 3);
        slidey.style.animation = `slideLeft 2s forwards ease-in-out`;
        slidey.style.animationDelay = `${length}s`;
      });
      rightSlideys.forEach((slidey) => {
        let length = getRandomArbitrary(0, 2);
        slidey.style.animation = `slideRight 2s forwards ease-in-out`;
        slidey.style.animationDelay = `${length}s`;
      });
    } else {
      leftSlideys.forEach((slidey) => {
        slidey.style.animation = "none";
      });
      rightSlideys.forEach((slidey) => {
        slidey.style.animation = "none";
      });
    }
  });
});
const slideFadeUp = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    let randoDelay = Math.random().toFixed(2);
    let slideys = entry.target.querySelectorAll(".slide-fade-up");
    if (entry.intersectionRatio > 0) {
      for (let i = 0; i < slideys.length; i++) {
        slideys[i].style.animation = `slideFadeUp 1s forwards ease-in-out`;
        slideys[i].style.animationDelay = `${+(i * randoDelay)}s`;
      }
    }
  });
});
const bgRotate = new IntersectionObserver(function (entries) {
  let gradient = document.querySelector('.gradient')
  const sectionDeg = {
    "header-header":"0deg",
    "projects-header":"45deg",
    "skills-header":"90deg"
  }
  const sectionY= {
    "header-header":"0px",
    "projects-header":"-900px",
    "skills-header":"-1800px"
  }

  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      // entry.target.classList[1]
      // gradient.style.transform = `rotate(${sectionDeg[entry.target.classList[1]]})`
      gradient.style.backgroundPositionY = sectionY[entry.target.classList[1]]
    }
  });
});

const sectionElems = document.querySelectorAll(".section-header")
sectionElems.forEach(elem => {
  bgRotate.observe(elem)
})

const skillsSection = document.querySelector(".skills");
const skillTables = document.querySelectorAll(".skill-table");
const sections = document.querySelectorAll(".section");

slideIn.observe(skillsSection);
skillTables.forEach((skillTable) => {
  slideFadeUp.observe(skillTable);
});

const fullPagePosition = new MutationObserver(function(mutations) {
  // let gradients = document.querySelectorAll('.gradient');
  // let docStyle = document.documentElement.style
	// mutations.forEach(function(mutationRecord) {
  //   let regExp = /\(([^)]+)\)/;
  //   let translationVals = (regExp.exec(mutationRecord.target.style.transform)[1]).split(', ')
  //   let xPx = translationVals[0]
  //   let yPx = translationVals[1]
  //   let yNum = (yPx.replace('px', '')).replace('-', '')
  //   let degStart = (360 * (yNum / 2400))
  //   let degEnd = (360 * (yNum / 2400))
  //   let lastDeg = degEnd - 180

  //   let ratio = (degEnd - lastDeg) / 9
    

  //   gradients.forEach(gradient => {
  //     docStyle.setProperty('--deg-0', `${lastDeg}deg`)
      
  //     for(let i = 1; i < 9; i++){
  //       docStyle.setProperty(`--deg-${i}`, `${ratio * i}deg`)
  //     }
  //     docStyle.setProperty('--deg-10', `${degEnd}deg`)
  //     // gradient.style.background = `linear-gradient(${degStart}deg,#4158d0 0%,#c850c0 46%,#ffcc70 100%)`
  //     gradient.style.animation = `bgRotate 1s forwards ease-in-out`;
  //   })
	// });
  let gradient = document.querySelector('.gradient')
  mutations.forEach((mutationRecord) => {
    // console.log(mutationRecord)
    // console.log(gradient.style)
    let regExp = /\(([^)]+)\)/;
    let translationVals = (regExp.exec(mutationRecord.target.style.transform)[1]).split(', ')
    let xPx = translationVals[0]
    let yPx = translationVals[1]
    let yNum = (yPx.replace('px', '')).replace('-', '')
  })    
});

let fpWrapper = document.getElementById('fullpage');
// fullPagePosition.observe(fpWrapper, { attributes : true, attributeFilter : ['style'] });

