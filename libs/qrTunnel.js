// librairie pour generer le QR code adaptee a l'adresse de la page
import qrcode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm";

console.log("renning");

const qrOverlay = document.createRange().createContextualFragment(`
<div style="position:absolute;inset:0;width:100lvw;height:100lvh;display:grid;place-items:center;z-index:99999;">
    <canvas id="qrCanvas">this is an inner paragraph</canvas>
</div>
`).firstElementChild;

document.body.appendChild(qrOverlay);

qrOverlay.addEventListener("click", () => {
    qrOverlay.remove();
})

// on montre le QR seulement si on est pas sur localhost
// parce que pour visiter le site depuis un mobile, il faut le faire au travers du tunnel
if (
    window.location.hostname != "localhost" &&
    !window.location.hostname.match("^127.") &&
    window.location.hostname != "::1"
) {
    qrcode.toCanvas(
    document.getElementById("qrCanvas"),
    window.location.href,
    { scale: 8 },
    (err) => console.error(err),
    );
}