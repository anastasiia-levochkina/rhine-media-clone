const navbar = document.getElementById("navbar");
const ham = document.getElementById("ham");
const mobMenu = document.getElementById("mobMenu");
const mobClose = document.getElementById("mobClose");

const handleScroll = () => {
	if (navbar) {
		navbar.classList.toggle("scrolled", window.scrollY > 55);
	}
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

const openMenu = () => {
	mobMenu.classList.add("open");
	document.body.style.overflow = "hidden";
};

const closeMenu = () => {
	mobMenu.classList.remove("open");
	document.body.style.overflow = "";
};

if (ham && mobMenu && mobClose) {
	ham.addEventListener("click", openMenu);
	mobClose.addEventListener("click", closeMenu);

	mobMenu.querySelectorAll(".mob-link").forEach((link) => {
		link.addEventListener("click", closeMenu);
	});
}

const revealElements = document.querySelectorAll("[data-a]");

const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("vis");
			}
		});
	},
	{
		threshold: 0.1,
		rootMargin: "0px 0px -48px 0px",
	}
);

revealElements.forEach((element) => revealObserver.observe(element));

const orbA = document.querySelector(".orb-a");
const orbB = document.querySelector(".orb-b");

window.addEventListener(
	"scroll",
	() => {
		const scrollY = window.scrollY;

		if (orbA) {
			orbA.style.transform = `translateY(${scrollY * 0.12}px)`;
		}

		if (orbB) {
			orbB.style.transform = `translateY(${scrollY * 0.08}px)`;
		}
	},
	{ passive: true }
);

const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

if (contactForm && successMsg) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const requiredFields = contactForm.querySelectorAll("[required]");
		let isValid = true;

		requiredFields.forEach((field) => {
			const valid = field.type === "checkbox" ? field.checked : field.value.trim();
			field.style.borderColor = valid ? "" : "#e87060";
			isValid = Boolean(valid) && isValid;
		});

		if (!isValid) return;

		const submitBtn = contactForm.querySelector('[type="submit"]');
		submitBtn.disabled = true;
		submitBtn.firstChild.textContent = "Sending ";

		setTimeout(() => {
			successMsg.classList.add("show");
			submitBtn.style.display = "none";
			contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
				field.disabled = true;
			});
		}, 800);
	});
}

document.querySelectorAll(".faq-item").forEach((item) => {
	const button = item.querySelector(".faq-q");

	if (!button) return;

	button.addEventListener("click", () => {
		const isOpen = item.classList.contains("open");

		document.querySelectorAll(".faq-item").forEach((faqItem) => {
			faqItem.classList.remove("open");
			faqItem.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
		});

		if (!isOpen) {
			item.classList.add("open");
			button.setAttribute("aria-expanded", "true");
		}
	});
});
