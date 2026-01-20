const state = {
	goalCups: 8,
	consumedCups: 0,
	cupSizeMl: 250
};

const els = {
	progressRing: document.getElementById('progressRing'),
	progressPercent: document.getElementById('progressPercent'),
	consumed: document.getElementById('consumedCups'),
	remaining: document.getElementById('remainingCups'),
	goal: document.getElementById('goalDisplay'),
	goalInput: document.getElementById('goalInput'),
	saveGoal: document.getElementById('saveGoal'),
	cupSizeInput: document.getElementById('cupSizeInput'),
	addCup: document.getElementById('addCup'),
	removeCup: document.getElementById('removeCup'),
	resetDay: document.getElementById('resetDay'),
	reminderTitle: document.getElementById('reminderTitle'),
	reminderBody: document.getElementById('reminderBody')
};

const clampGoal = (value) => {
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
};

const setGoal = (value) => {
	state.goalCups = clampGoal(value);
	els.goalInput.value = state.goalCups;
	updateUI();
};

const setCupSize = (value) => {
	const parsed = Number(value);
	const safe = Number.isFinite(parsed) && parsed >= 50 ? Math.round(parsed) : 250;
	state.cupSizeMl = safe;
	els.cupSizeInput.value = state.cupSizeMl;
	updateUI();
};

const addCup = () => {
	state.consumedCups += 1;
	updateUI();
};

const removeCup = () => {
	state.consumedCups = Math.max(0, state.consumedCups - 1);
	updateUI();
};

const resetDay = () => {
	state.consumedCups = 0;
	updateUI();
};

const updateReminder = (progress) => {
	if (progress === 0) {
		els.reminderTitle.textContent = 'Start sipping.';
		els.reminderBody.textContent = `Drink your first ${state.cupSizeMl}ml cup now to set the pace.`;
		return;
	}

	if (progress < 0.4) {
		els.reminderTitle.textContent = 'Keep it steady.';
		els.reminderBody.textContent = 'Take a quick stretch and finish a cup in the next 10 minutes.';
		return;
	}

	if (progress < 0.75) {
		els.reminderTitle.textContent = 'Nice momentum.';
		els.reminderBody.textContent = 'Sip a cup with your next task switch to stay on track.';
		return;
	}

	if (progress < 1) {
		els.reminderTitle.textContent = 'Almost there!';
		els.reminderBody.textContent = 'One or two small cups will close the gap.';
		return;
	}

	els.reminderTitle.textContent = 'Goal met!';
	els.reminderBody.textContent = 'Great job. Keep a cup nearby to maintain the habit.';
};

const updateRing = (progress) => {
	const percent = Math.min(progress, 1) * 100;
	const deg = percent * 3.6;
	els.progressRing.style.background = `conic-gradient(var(--accent) 0deg ${deg}deg, var(--border) ${deg}deg 360deg)`;
	els.progressPercent.textContent = `${Math.round(percent)}%`;
};

const updateUI = () => {
	const progress = state.goalCups === 0 ? 0 : state.consumedCups / state.goalCups;
	const remaining = Math.max(0, state.goalCups - state.consumedCups);

	els.consumed.textContent = `${state.consumedCups} cup${state.consumedCups === 1 ? '' : 's'}`;
	els.remaining.textContent = `${remaining} cup${remaining === 1 ? '' : 's'}`;
	els.goal.textContent = `${state.goalCups} cup${state.goalCups === 1 ? '' : 's'}`;

	updateRing(progress);
	updateReminder(progress);
};

// Event bindings
els.saveGoal.addEventListener('click', () => setGoal(els.goalInput.value));
els.goalInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') setGoal(els.goalInput.value);
});

els.cupSizeInput.addEventListener('input', () => setCupSize(els.cupSizeInput.value));
els.addCup.addEventListener('click', addCup);
els.removeCup.addEventListener('click', removeCup);
els.resetDay.addEventListener('click', resetDay);

// Init
updateUI();
