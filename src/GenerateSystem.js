import * as THREE from "three";

const generateSystem = (
  system,
  systemParameters,
  allPlanetsArray,
  scene,
  material
) => {
  //jupiter:earth radius = 11.209
  //jupiter:earth mass = 318
  //au:sol radius/mass/distance
  //jupiter:sol radius = 11
  // solar radius in jupiter radii = 9,73116


  const solRadius = 9.73116;
  const jupiterRadius = 1;
  const au = 2092.51;
  const defaultBinarySeparation = 20; //known average
  const defaultSemimajoraxis = 1;
  let adjustedAU = au * systemParameters.distance;

  




  /**
   * Planet Renderer
   */
  const renderPlanet = (planet, starGroup) => {
    let planetsArray = [];
    Array.isArray(planet) ? (planetsArray = planet) : planetsArray.push(planet);

    planetsArray.map((planet, i) => {
      let semimajoraxis, eccentricity, period, inclination, radius, name;

      planet.hasOwnProperty("name")
        ? (name = Array.isArray(planet.name)
            ? planet.name[0]._text
            : planet.name._text)
        : "planet-" + i;
      

      planet.hasOwnProperty("radius")
        ? (radius = parseFloat(planet.radius._text))
        : (radius = planet.hasOwnProperty("mass")
            ? planet.mass.hasOwnProperty("_text")
              ? parseFloat(planet.mass._text)
              : 1
            : 1);

      const planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 64, 64),
        material
      );

      planet.hasOwnProperty("semimajoraxis")
        ? (semimajoraxis =
            parseFloat(planet.semimajoraxis._text) * adjustedAU)
        : (semimajoraxis = defaultSemimajoraxis * adjustedAU);

      planet.hasOwnProperty("eccentricity")
        ? (eccentricity = parseFloat(planet.eccentricity._text))
        : (eccentricity = 0);

      planet.hasOwnProperty("period")
        ? (period = parseFloat(planet.period._text))
        : (period = 0.1);

      planet.hasOwnProperty("inclination")
        ? (inclination = parseFloat(planet.inclination._text))
        : (inclination = 0);

      planetMesh.position.x = semimajoraxis;
      planetMesh.name = name;


      console.log(name, "radius: " + radius, "period: " + period)


      //Orbits
      const curve = new THREE.EllipseCurve(
        0,
        0, // ax, aY
        Math.cos(eccentricity) + semimajoraxis,
        Math.sin(eccentricity) + semimajoraxis, // xRadius, yRadius
        0,
        2 * Math.PI, // aStartAngle, aEndAngle
        false, // aClockwise
        0 // aRotation
      );

      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      orbitMaterial.transparent = true;
      orbitMaterial.opacity = 0.25;
      const orbitEllipse = new THREE.Line(geometry, orbitMaterial);

      let orbitsGroup = new THREE.Group();
      orbitsGroup.add(planetMesh, orbitEllipse);
      orbitsGroup.rotation.x = inclination;

      allPlanetsArray.push({
        mesh: planetMesh,
        semimajoraxis,
        period,
        eccentricity,
        inclination,
      });

      if (starGroup === null) {
        scene.add(orbitsGroup);
      } else {
        starGroup.add(orbitsGroup);
      }
    });
  };

  /**
   * Star Renderer
   */
  const renderStar = (star, separation = 0, binaryGroup = null) => {
    let starsArray = [];
    Array.isArray(star) ? (starsArray = star) : starsArray.push(star);

    const starsArraySize = starsArray.length;
    starsArray.map((star, i) => {
      let starRadius = solRadius;

      let name;

      star.hasOwnProperty("radius")
        ? (starRadius = parseFloat(star.radius._text))
        : (starRadius = 1);

      star.hasOwnProperty("name")
      ? (name = Array.isArray(star.name)
          ? star.name[0]._text
          : star.name._text)
      : "star-" + i;
    


      const starMesh = new THREE.Mesh(
        new THREE.SphereGeometry(starRadius * solRadius, 64, 64),
        material
      );

      let starGroup = new THREE.Group();

      starMesh.name = name;

      //TODO: think about this some more.
      starGroup.position.x = parseFloat(separation) / starsArraySize + i * 215;
      starGroup.add(starMesh);

      if (binaryGroup == null) {
        scene.add(starGroup);
      } else {
        binaryGroup.add(starGroup);
      }

      //render planets
      star.hasOwnProperty("planet") && renderPlanet(star.planet, starGroup);
    });
  };

  /**
   * Binary Renderer
   */
  const renderBinary = (binary, separation = null, group = null) => {
    let binaryArray = [];
    Array.isArray(binary) ? (binaryArray = binary) : binaryArray.push(binary);

    let binaryGroup = new THREE.Group();

    if (group === null) {
      group = binaryGroup;
    } else {
      binaryGroup.position.x = parseFloat(separation) * adjustedAU;
    }
    scene.add(group);

    if (separation === null) {
      separation = defaultBinarySeparation * adjustedAU;
    }

    //Binary loop
    binaryArray.map((binary) => {

      //render star
      
      // if(binary.hasOwnProperty("separation")){
      //   Array.isArray(binary.separation) ?
      // } 

      binary.hasOwnProperty("star") &&
        renderStar(
          binary.star,
          binary.hasOwnProperty("separation") ? binary.separation._text : defaultBinarySeparation * adjustedAU,
          group
        );

      //TODO: add separation?
      binary.hasOwnProperty("binary") && renderBinary(binary.binary, group);

      //render planets
      binary.hasOwnProperty("planet") && renderPlanet(binary.planet, group);
    });
  };

  /**
   * Iterator
   */

  //contains binary
  system.system.hasOwnProperty("binary") && renderBinary(system.system.binary);

  //contains star
  system.system.hasOwnProperty("star") && renderStar(system.system.star);

  //contains planet
  system.system.hasOwnProperty("planet") && renderPlanet(system.system.planet);
};

export default generateSystem;
