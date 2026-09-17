const progressSection = document.querySelector('.development-progress');
const progressFill = document.getElementById('progress-fill');
const progressNumber = document.getElementById('progress-number');

let progressHasAnimated = false;

function animateProgress() {

    if (progressHasAnimated) {
        return;
    }

    progressHasAnimated = true;

    const targetProgress = Number(
        progressFill.dataset.progress
    );

    progressFill.style.width = targetProgress + '%';

    const duration = 1600;
    const startTime = performance.now();

    function updateNumber(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(
            elapsed / duration,
            1
        );

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        const currentValue = Math.round(
            targetProgress * easedProgress
        );

        progressNumber.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            progressNumber.textContent = targetProgress;
        }

    }

    requestAnimationFrame(updateNumber);
}


const progressObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                animateProgress();

                progressObserver.unobserve(
                    entry.target
                );

            }

        });

    },

    {
        threshold: 0.35
    }

);


if (progressSection) {
    progressObserver.observe(progressSection);
}
