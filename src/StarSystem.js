const StarSystem = () => {
  return `
  <system>
	<name>PH-1</name>
	<name>PH-1</name>
	<name>Kepler-64 (AB)</name>
	<name>KIC 4862625</name>
	<rightascension>19 52 51</rightascension>
	<declination>+39 57 18</declination>
	<distance>1500</distance>
	<magJ errorminus="0.023" errorplus="0.023">12.714</magJ>
	<magH errorminus="0.022" errorplus="0.022">12.461</magH>
	<magK errorminus="0.021" errorplus="0.021">12.395</magK>
	<binary>
		<name>PH-1</name>
		<name>Kepler-64</name>
		<name>KIC 4862625</name>
		<name>2MASS J19525162+3957183</name>
		<separation unit="arcsec">0.7</separation>
		<separation unit="AU">1000</separation>
		<positionangle>123</positionangle>
		<binary>
			<name>PH-1 A</name>
			<name>Kepler-64 A</name>
			<name>KIC 4862625 A</name>
			<period>20.000214</period>
			<semimajoraxis>0.1744</semimajoraxis>
			<eccentricity>0.21166048</eccentricity>
			<periastron>348</periastron>
			<star>
				<name>PH-1 Aa</name>
				<name>Kepler-64 Aa</name>
				<name>KIC 4862625 Aa</name>
				<mass>1.384</mass>
				<radius>1.759</radius>
				<spectraltype>F</spectraltype>
			</star>
			<star>
				<name>PH-1 Ab</name>
				<name>Kepler-64 Ab</name>
				<name>KIC 4862625 Ab</name>
				<mass>0.386</mass>
				<radius>0.422</radius>
				<spectraltype>M</spectraltype>
			</star>
			<planet>
				<name>PH-1 A(ab) b</name>
				<name>PH-1 b</name>
				<name>KIC 4862625 A(ab) b</name>
				<name>Planet Hunters 1 b</name>
				<name>Kepler-64 b</name>
				<name>Kepler-64 A(ab) b</name>
				<name>KIC 4862625 b</name>
				<list>Confirmed planets</list>
				<radius>0.5631852</radius>
				<period>138.506</period>
				<semimajoraxis>0.634</semimajoraxis>
				<eccentricity>0.0539</eccentricity>
				<inclination>90.022</inclination>
				<transittime errorminus="0.11" errorplus="0.11" unit="BJD">2455074.71</transittime>
				<description>PH 1 b is a circumbinary planet in a quadruple star system. It is orbiting a double star and there is a second pair of stars at approximately 1000 AU. Citizen scientists discovered this planet by looking at many light curves using the online tool at planethunters.org.</description>
				<discoverymethod>transit</discoverymethod>
				<lastupdate>12/10/15</lastupdate>
				<discoveryyear>2012</discoveryyear>
				<image>PH1</image>
				<imagedescription>An artist's conception of the planet in a four-star system. 
		
	Credit: Image by Haven Giguere/Yale.</imagedescription>
				<list>Planets in binary systems, P-type</list>
				<istransiting>1</istransiting>
			</planet>
		</binary>
		<binary>
			<name>PH-1 B</name>
			<name>Kepler-64 B</name>
			<name>KIC 4862625 B</name>
			<separation unit="arcsec" upperlimit="0.4" />
			<separation unit="AU" upperlimit="60" />
			<star>
				<name>PH-1 Ba</name>
				<name>Kepler-64 Ba</name>
				<name>KIC 4862625 Ba</name>
				<mass>0.99</mass>
				<spectraltype>G2</spectraltype>
			</star>
			<star>
				<name>PH-1 Bb</name>
				<name>Kepler-64 Bb</name>
				<name>KIC 4862625 Bb</name>
				<mass>0.51</mass>
				<spectraltype>M2</spectraltype>
			</star>
      <planet>
				<name>PH-1 A(ab) b</name>
				<name>PH-1 b</name>
				<name>KIC 4862625 A(ab) b</name>
				<name>Planet Hunters 1 b</name>
				<name>Kepler-64 b</name>
				<name>Kepler-64 A(ab) b</name>
				<name>KIC 4862625 b</name>
				<list>Confirmed planets</list>
				<radius>0.5631852</radius>
				<period>100.506</period>
				<semimajoraxis>1</semimajoraxis>
				<eccentricity>0.0539</eccentricity>
				<inclination>90.022</inclination>
				<transittime errorminus="0.11" errorplus="0.11" unit="BJD">2455074.71</transittime>
				<description>PH 1 b is a circumbinary planet in a quadruple star system. It is orbiting a double star and there is a second pair of stars at approximately 1000 AU. Citizen scientists discovered this planet by looking at many light curves using the online tool at planethunters.org.</description>
				<discoverymethod>transit</discoverymethod>
				<lastupdate>12/10/15</lastupdate>
				<discoveryyear>2012</discoveryyear>
				<image>PH1</image>
				<imagedescription>An artist's conception of the planet in a four-star system. 
		
	Credit: Image by Haven Giguere/Yale.</imagedescription>
				<list>Planets in binary systems, P-type</list>
				<istransiting>1</istransiting>
			</planet>
		</binary>
	</binary>
	<videolink>http://youtu.be/QSOdlfHwR6k</videolink>
	<constellation>Cygnus</constellation>
</system>


    `;
};

export default StarSystem;
