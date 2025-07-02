require("../animations/steps-reveal.js")();
require("../animations/custom-cursor.js")();
require("../animations/line-highlight.js")();

const eventDateElement = document.getElementById("event_date");
const eventDay = document.getElementById("event_day");
const eventHour = document.getElementById("event_hour");
const eventMin = document.getElementById("event_min");

if (!eventDateElement || !eventDay || !eventHour || !eventMin) return;

const rawDate = eventDateElement.textContent.trim(); // Ex: "11/1/2025"
const [day, month, year] = rawDate.split("/").map(Number);

const eventDate = new Date(year, month - 1, day);

// Formaté : Samedi 11 janvier 2025
const jours = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const mois = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const jourNom = jours[eventDate.getDay()];
const moisNom = mois[eventDate.getMonth()];
const jour = eventDate.getDate();
const annee = eventDate.getFullYear();

eventDateElement.textContent = `${jourNom} ${jour} ${moisNom} ${annee}`;

// Fonction de mise à jour du compte à rebours
function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    eventDay.textContent = "0";
    eventHour.textContent = "0";
    eventMin.textContent = "0";
    return;
  }

  const totalMinutes = Math.floor(diff / 60000); // 1000*60
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  eventDay.textContent = days;
  eventHour.textContent = hours;
  eventMin.textContent = minutes;
}

updateCountdown();
setInterval(updateCountdown, 60000); // Mise à jour toutes les minutes
