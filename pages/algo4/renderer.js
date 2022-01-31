class Sphere {
    constructor(rayon, id) {
        this.rayon = rayon;
        this.id = id;
        this.coord = new Vecteur3(0, 0, 0);

        this.vel = {};
        this.vel = new Vecteur3(0, 0, 0);
    }

    collision(sphere) {
        let d = this.distance(sphere);

        return d < this.rayon + sphere.rayon;
    }

    distance(sphere) {
        return Math.sqrt(
            Math.pow(this.coord.x - sphere.coord.x, 2) +
                Math.pow(this.coord.y - sphere.coord.y, 2) +
                Math.pow(this.coord.z - sphere.coord.z, 2)
        );
    }

    writeDescription() {
        return `Sphere ${this.rayon} de rayon position (${this.coord.x}, ${this.coord.y}, ${this.coord.z})`;
    }

    volume() {
        return 4 * Math.PI * Math.pow(this.rayon);
    }

    applyVecteur(time, vecteur = this.vel) {
        //time en nombre de seconde
        this.coord.x += vecteur.x * time;
        this.coord.y += vecteur.y * time;
        this.coord.z += vecteur.z * time;
    }

    applyVel(time) {
        this.applyVecteur(time);
        this.vel.multiplie(0.9 * time);
    }

    applyGrav(time, grav) {
        this.applyVecteur(time, grav);
    }
}

class Vecteur3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    norme() {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
        );
    }

    angleVecteur(vecteur) {
        let up = this.multiplieVecteur(vecteur);
        let down = this.norme() * vecteur.norme();

        let cosAngle = up / down;

        return Math.acos(cosAngle);
    }

    multiplie(number) {
        this.x * number;
        this.y * number;
        this.z * number;
    }

    multiplieVecteur(vecteur) {
        return this.x * vecteur.x + this.y * vecteur.y + this.z * vecteur.z;
    }

    static makeFrom(v1, v2) {
        return new Vecteur3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z);
    }
}

class Container {
    constructor(largeur, longueur, hauteur) {
        this.largeur = largeur;
        this.longueur = longueur;
        this.hauteur = hauteur;
    } // x , z , y

    isInBound(pos, ray) {
        return (
            pos.x - ray > 0 &&
            pos.y - ray > 0 &&
            pos.z - ray > 0 &&
            pos.x + ray < this.largeur &&
            pos.z + ray < this.longueur
        );
    }

    center() {
        return {
            x: this.largeur / 2,
            y: this.hauteur,
            z: this.longueur / 2,
        };
    }

    putInBound(sphere) {
        sphere.coord.x =
            sphere.coord.x +
            (sphere.coord.x - sphere.rayon > 0
                ? 0
                : sphere.coord.x - sphere.rayon * -1) +
            (sphere.coord.x + sphere.rayon < this.largeur
                ? 0
                : this.largeur - sphere.coord.x - sphere.rayon);

        sphere.coord.y =
            sphere.coord.y +
            (sphere.coord.y - sphere.rayon > 0
                ? 0
                : sphere.coord.y - sphere.rayon * -1);

        sphere.coord.z =
            sphere.coord.z +
            (sphere.coord.z - sphere.rayon > 0
                ? 0
                : sphere.coord.z - sphere.rayon * -1) +
            (sphere.coord.z + sphere.rayon < this.longueur
                ? 0
                : this.longueur - sphere.coord.z - sphere.rayon);
    }

    allOutSphere(spheres) {
        let outs = [];

        for (let sphere of spheres) {
            if (sphere.coord.y + sphere.rayon > this.hauteur) {
                outs.push(sphere);
            }
        }

        return outs;
    }

    allInSphere(spheres) {
        let ins = [];

        for (let sphere of spheres) {
            if (sphere.coord.y + sphere.rayon <= this.hauteur) {
                ins.push(sphere);
            }
        }

        return ins;
    }

    volume() {
        return this.hauteur * this.largeur * this.longueur;
    }
}

const config = {
    taille: {
        max: 50,
        min: 10,
    },
    nombreSphere: {
        max: 20,
        min: 10,
    },
    nombreTours: 60, //En seconde
    shaking: {
        until: 240 * 0.75, //en secondes
        max: 40,
        min: 20,
        nombreSphere: 3,
        each: 20,
    },
    apparition: {
        each: 1, //en seconde
    },
    conteneur: {
        largeur: 250,
        longueur: 250,
        hauteur: 250,
    },
    gravite: new Vecteur3(0, 10, 0), //A tweak
};

function generateSphere(number) {
    return Array.from({ length: number }, (_, i) => {
        return randInt(config.taille.min, config.taille.max);
    });
}

function randInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

let AllSphere = [];

function loop(spheres, container, time) {
    // spheres = (spheres) => {
    //     for (let i = spheres.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         const temp = spheres[i];
    //         spheres[i] = spheres[j];
    //         spheres[j] = temp;
    //     }
    // };

    for (let si in spheres) {
        spheres[si].applyVel(time);
        spheres[si].applyGrav(time, config.gravite);
        let collision = detectCollision(spheres, si);

        if (collision) {
            resolveCollisionSphere(spheres[si], spheres[collision]);
        }

        container.putInBound(spheres[si]);
    }
}

function shake(spheres) {
    for (let i = 0; i < config.shaking.nombreSphere; i++) {
        spheres[randInt(0, spheres.length - 1)].vel = new Vecteur3(
            randInt(config.shaking.min),
            randInt(config.shaking.min),
            randInt(config.shaking.min)
        );
    }
}

function detectCollision(spheres, i) {
    for (let si in spheres) {
        if (si != i) {
            if (spheres[i].collision(spheres[si])) {
                return si;
            }
        }
    }

    return false;
}

function resolveCollisionSphere(s1, s2) {
    let n = 0.9 * ((s1.vel.norme() + s2.vel.norme()) / 2);

    let s1s2 = Vecteur3.makeFrom(s1.coord, s2.coord);
    let s2s1 = Vecteur3.makeFrom(s2.coord, s1.coord);

    let lambda = calcLambda(n, s1s2);

    s1.vel = s2s1.multiplie(lambda);
    s2.vel = s1s2.multiplie(lambda);
}

function calcLambda(n, vec) {
    return Math.sqrt(
        Math.pow(n, 2) /
            (Math.pow(vec.x, 2) + Math.pow(vec.y, 2), Math.pow(vec.z, 2))
    );
}

async function mainLoop() {
    let start = Date.now();
    let last = Date.now();

    let sinceLastSpawn = Date.now();
    let spawnedSpheres = [];

    let sinceLastShaking = Date.now();

    let container = new Container(
        config.conteneur.largeur,
        config.conteneur.longueur,
        config.conteneur.hauteur
    );

    let exe = document.getElementById("Exe");
    exe.innerHTML = "Oui";

    let eleTime = document.getElementById("Time");

    let now = Date.now();

    do {
        now = Date.now();
        let time = (now - last) / 1000;

        if (
            (now - sinceLastSpawn) / 1000 > config.apparition.each &&
            AllSphere.length > spawnedSpheres.length
        ) {
            let spawnedSphere = new Sphere(
                AllSphere[spawnedSpheres.length],
                spawnedSpheres.length
            );

            let center = container.center();

            spawnedSphere.coord.x = center.x + Math.random();
            spawnedSphere.coord.z = center.z + Math.random();
            spawnedSphere.coord.y = center.y;

            spawnedSpheres.push(spawnedSphere);

            sinceLastSpawn = now;
        }

        if (
            (now - sinceLastShaking) / 1000 > config.shaking.each &&
            (now - start) / 1000 < config.shaking.until
        ) {
            shake(spawnedSpheres);
        }

        loop(spawnedSpheres, container, time);

        last = now;

        eleTime.innerHTML = Math.floor((now - start) / 1000);

        await new Promise((r) => setTimeout(r, 50));
    } while ((now - start) / 1000 < config.nombreTours);

    exe.innerHTML = "Non";
    writeResult(spawnedSpheres, container);
}

function writeResult(spheres, container) {
    let thereIsCollision = false;
    let unusedVolume = 0;
    let inSpheres = container.allInSphere(spheres);
    let volume = 0;

    for (let sphere in inSpheres) {
        thereIsCollision =
            thereIsCollision === false
                ? detectCollision(inSpheres, sphere)
                : true;

        volume += inSpheres[sphere].volume();
    }

    unusedVolume = container.volume - volume;

    document.getElementById("Collisions").innerHTML = thereIsCollision
        ? "Oui"
        : "Non";

    document.getElementById("Volume").innerHTML = volume;

    let elemSphere = document.getElementById("Spheres");

    writeSpheres(elemSphere, inSpheres);
}

function writeSpheres(element, spheres, sp = true) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    for (let s of spheres) {
        let child = document.createElement("li");
        child.innerHTML = sp ? s.writeDescription() : `Sphere de ${s} de rayon`;

        element.appendChild(child);
    }
}

function btnGenerate() {
    AllSphere = this.generateSphere(
        randInt(config.nombreSphere.min, config.nombreSphere.max)
    );

    writeSpheres(document.getElementById("AllSphere"), AllSphere, false);
}
