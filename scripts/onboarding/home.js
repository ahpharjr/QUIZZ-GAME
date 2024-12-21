function startOnboarding() {
    introJs().setOptions({
        nextLabel: 'Next ',
        prevLabel: ' Back',
        doneLabel: 'Finish',
        skipLabel: 'Skip',
        tooltipClass: 'custom-tooltip',
        highlightClass: 'custom-highlight',
        steps: [
            {
                title: "Welcome to Quiz Game! 🚀",
                intro: "Ready to embark on an exciting journey of knowledge and achievement? Here’s your ultimate guide to getting started"
            },
            {
                element: document.querySelector('.info-container'),
                title: "Your Mission 🌟",
                intro: "Become a knowledge explorer! Earn EXP points through quizzes and flashcards to level up, unlock new challenges, and reap exciting rewards!"
            },
            {
                element: document.querySelector('.profile-info-box2'),
                title: "To Level Up",
                intro: "Earn Experience Points (EXP) by completing activities.<br> Once you reach the required EXP, you’ll level up and unlock new challenges.",
                position: 'right'
            },
            {
                element: document.querySelector('.right-div'),
                title: "Unlock Achievements 🏆",
                intro: "Push your limits and conquer milestones to earn exclusive achievement badges!"
            },
            {
                element: document.querySelector('.learning-zone-box'),
                title: "Learning Zone 📘",
                intro: "Expand your knowledge through interactive flashcards—perfect for sharpening your understanding at your own pace."
            },
            {
                element: document.querySelector('.game-zone-box'),
                title: "Gaming Zone 🎮",
                intro: "Put your brainpower to the test with fun, fast-paced quizzes. Climb the leaderboard, improve your score, and show the world your expertise!"
            }
        ]
    }).start();
}

// Automatically trigger onboarding for new users
window.onload = function () {
    if (!localStorage.getItem('onboardingCompleted')) {
        startOnboarding();
        introJs().oncomplete(function () {
            localStorage.setItem('onboardingCompleted', true);
        });
    }
};

console.log('hello')