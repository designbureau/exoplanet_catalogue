const StarSystem = () => {
  return `
  <system>
	<name>WASP-18</name>
	<name>HD 10069</name>
	<name>HIP 7562</name>
	<rightascension>01 37 25.0335</rightascension>
	<declination>-45 40 40.3765</declination>
	<distance errorminus="0.37" errorplus="0.37">123.92</distance>
	<star>
		<name>WASP-18</name>
		<name>HD 10069</name>
		<name>HIP 7562</name>
		<name>Gaia DR2 4955371367334610048</name>
		<name>TYC 8040-72-1</name>
		<radius>1.23</radius>
		<magV errorminus="0.018" errorplus="0.018">9.303</magV>
		<magJ errorminus="0.018" errorplus="0.018">8.409</magJ>
		<magH errorminus="0.055" errorplus="0.055">8.231</magH>
		<magK errorminus="0.027" errorplus="0.027">8.131</magK>
		<magB>9.74</magB>
		<mass>1.22</mass>
		<temperature>6400.00</temperature>
		<spectraltype>F6IV/V</spectraltype>
		<planet>
			<name>WASP-18 b</name>
			<name>HD 10069 b</name>
			<name>HIP 7562 b</name>
			<name>Gaia DR2 4955371367334610048 b</name>
			<name>TYC 8040-72-1 b</name>
			<semimajoraxis>0.020000</semimajoraxis>
			<inclination errorminus="0.279" errorplus="0.279">85.680</inclination>
			<period errorminus="0.00000234" errorplus="0.00000234">0.94124000</period>
			<description>This planet was discovered by Hellier et al. 2009. This was a ground based discovery. The parameters listed here are those reported by Pearson 2019 and were imported into the Open Exoplanet Catalogue from the NASA Exoplanet Archive.</description>
			<mass>10.42954</mass>
			<discoverymethod>transit</discoverymethod>
			<istransiting>1</istransiting>
			<discoveryyear>2009</discoveryyear>
			<list>Confirmed planets</list>
			<lastupdate>19/12/05</lastupdate>
		</planet>
		<planet>
			<name>WASP-18 c</name>
			<name>HD 10069 c</name>
			<name>HIP 7562 c</name>
			<name>Gaia DR2 4955371367334610048 c</name>
			<name>TYC 8040-72-1 c</name>
			<semimajoraxis>0.035000</semimajoraxis>
			<eccentricity>0.015000</eccentricity>
			<periastron errorminus="13.0000" errorplus="13.0000">272.0000</periastron>
			<period errorminus="0.00640000" errorplus="0.00640000">2.15580000</period>
			<description>This planet was discovered by Pearson 2019. The discovery was made with a space based telescope (0.1 m TESS Telescope). The parameters listed here are those reported by Pearson 2019 and were imported into the Open Exoplanet Catalogue from the NASA Exoplanet Archive.</description>
			<mass errorminus="0.03870" errorplus="0.03870">0.17368</mass>
			<discoverymethod>timing</discoverymethod>
			<discoveryyear>2019</discoveryyear>
			<list>Confirmed planets</list>
			<lastupdate>19/12/05</lastupdate>
		</planet>
	</star>
	<constellation>Phoenix</constellation>
</system>


    `;
};

export default StarSystem;
