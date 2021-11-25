import * as THREE from "three";

const generateSystem = (system, systemParameters, allPlanetsArray, scene, material) => {


  //jupiter:earth radius = 11.209
//jupiter:earth mass = 318
//au:sol radius/mass/distance
//jupiter:sol radius = 11

  const jupiterMass = 11;

  /**
   * Planet Renderer
   */
  const renderPlanet = (planet, starGroup) => {
    let planetsArray = [];
    Array.isArray(planet) ? (planetsArray = planet) : planetsArray.push(planet);

    // console.log(planets);
    planetsArray.map((planet, i) => {
      let semimajoraxis, eccentricity, period, inclination, radius;

      planet.hasOwnProperty("radius")
        ? (radius = parseFloat(planet.radius._text))
        : (radius = planet.hasOwnProperty("mass")
            ? parseFloat(planet.mass._text)
            : 1);

      const planetMesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 32, 32),
        material
      );

      planet.hasOwnProperty("semimajoraxis")
        ? (semimajoraxis =
            parseFloat(planet.semimajoraxis._text) * systemParameters.distance)
        : (semimajoraxis = 0.25 * systemParameters.distance + i * 100);

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


      const orbitMesh = new THREE.Mesh(
        new THREE.TorusGeometry(
          semimajoraxis, 1, 1, 100
        ),
        material
      );


      //Orbits
      const curve = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        semimajoraxis, semimajoraxis,  // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        inclination      // aRotation
      );
      
      const points = curve.getPoints( 50 );
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      const orbitMaterial = new THREE.LineBasicMaterial( { color : 0xff0000 } );
      // Create the final object to add to the scene
      const orbitEllipse = new THREE.Line( geometry, orbitMaterial );




      allPlanetsArray.push({
        mesh: planetMesh,
        semimajoraxis,
        period,
        eccentricity,
        inclination,
      });

      if (starGroup === null) {
        scene.add(planetMesh, orbitEllipse);
      } else {
        starGroup.add(planetMesh, orbitEllipse);
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
      let starRadius;
      star.hasOwnProperty("radius")
        ? (starRadius = parseFloat(star.radius._text))
        : (starRadius = 1);
      const starMesh = new THREE.Mesh(
        new THREE.SphereGeometry(starRadius * jupiterMass, 32, 32),
        material
      );

      let starGroup = new THREE.Group();

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
  const renderBinary = (binary, separation = 0, group = null) => {
    let binaryArray = [];
    Array.isArray(binary) ? (binaryArray = binary) : binaryArray.push(binary);


    let binaryGroup = new THREE.Group();

    if (group === null) {
      group = binaryGroup;
    }
    else{
      binaryGroup.position.x = parseFloat(separation) * 215;
    }
    scene.add(group);


    binaryArray.map((binary) => {
      // console.log(binary);

      binary.hasOwnProperty("star") &&
        renderStar(
          binary.star,
          binary.hasOwnProperty("separation") ? binary.separation._text : 500,
          group
        );

      //TODO: does this need a group?
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