// Reward clicker
console.log("Rewards script started")
let clickedTimes = 0;
let timer = setInterval(() => {
    const pointsBtn = document.querySelector("[aria-label='Claim Bonus']");
    if (pointsBtn) {
        pointsBtn.click();
        clickedTimes++;
        console.log(`Clicked! ${clickedTimes}`);
    }
}, 1000);