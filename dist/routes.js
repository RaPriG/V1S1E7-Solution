"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const systems_1 = require("./systems");
const router = (0, express_1.Router)();
let damagedSystem = null;
router.get('/status', (_req, res) => {
    if (!damagedSystem) {
        const randomIndex = Math.floor(Math.random() * systems_1.systems.length);
        damagedSystem = systems_1.systems[randomIndex] ?? null;
    }
    res.json({ damaged_system: damagedSystem });
});
router.get('/repair-bay', (_req, res) => {
    if (!damagedSystem) {
        return res.status(400).send('No damaged system registered');
    }
    const code = systems_1.codes[damagedSystem];
    const html = `
    <!DOCTYPE html>
    <html>
    <head><title>Repair</title></head>
    <body>
      <div class="anchor-point">${code}</div>
    </body>
    </html>
  `;
    damagedSystem = null;
    res.send(html);
});
router.post('/teapot', (_req, res) => {
    res.status(418).send("I'm a teapot");
});
exports.default = router;
//# sourceMappingURL=routes.js.map