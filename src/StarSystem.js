const StarSystem = () => {
  return `
  <system>
	<name>TrES-2</name>
	<name>Kepler-1</name>
	<name>KOI-1</name>
	<name>KIC 11446443</name>
	<rightascension>19 07 14</rightascension>
	<declination>+49 18 59</declination>
	<distance errorminus="11" errorplus="11">213</distance>
	<binary>
		<name>TrES-2</name>
		<separation errorminus="0.0015" errorplus="0.0015" unit="arcsec">1.1054</separation>
		<separation errorminus="13" errorplus="13" unit="AU">216</separation>
		<positionangle errorminus="0.007" errorplus="0.007">136.325</positionangle>
		<star>
			<name>TrES-2 A</name>
			<name>TYC 3549-02811-1</name>
			<name>2MASS J19071403+4918590</name>
			<name>KIC 11446443</name>
			<name>Kepler-1</name>
			<name>KOI-1</name>
			<mass errorminus="0.063" errorplus="0.063">0.983</mass>
			<radius errorminus="0.033" errorplus="0.033">1.003</radius>
			<metallicity>0.001</metallicity>
			<magB errorminus="0.10" errorplus="0.10">11.85</magB>
			<magV errorminus="0.08" errorplus="0.08">11.25</magV>
			<magJ errorminus="0.020" errorplus="0.020">10.232</magJ>
			<magH errorminus="0.026" errorplus="0.026">9.920</magH>
			<magK errorminus="0.022" errorplus="0.022">9.846</magK>
			<spectraltype>G0</spectraltype>
			<temperature errorminus="50" errorplus="50">5850</temperature>
			<planet>
				<name>TrES-2</name>
				<name>TrES-2 A b</name>
				<name>TrES-2 b</name>
				<name>Kepler-1 b</name>
				<name>KOI-1.01</name>
				<name>KOI-1 b</name>
				<name>KIC 11446443 b</name>
				<list>Confirmed planets</list>
				<list>Planets in binary systems, S-type</list>
				<mass>1.253</mass>
				<radius>1.169</radius>
				<period>2.470613402</period>
				<semimajoraxis>0.03556</semimajoraxis>
				<eccentricity>0.0</eccentricity>
				<inclination>83.874</inclination>
				<transittime errorminus="0.00021" errorplus="0.00021" unit="BJD">2454502.56227</transittime>
				<discoverymethod>transit</discoverymethod>
				<lastupdate>13/01/27</lastupdate>
				<discoveryyear>2006</discoveryyear>
				<description>The planet TrES-2 b is a Hot Jupiter orbiting the star GSC 03549-02811. Kipping and Spiegel (2011) identified it as the darkest known exoplanet, reflecting less than 1% of the light that hits it.</description>
				<istransiting>1</istransiting>
			</planet>
		</star>
		<star>
			<name>TrES-2 B</name>
			<magJ errorminus="0.020" errorplus="0.020">13.128</magJ>
			<magH errorminus="0.0073" errorplus="0.0073">12.3715</magH>
			<magK errorminus="0.019" errorplus="0.019">12.268</magK>
			<temperature errorminus="29" errorplus="29">3669</temperature>
			<mass errorminus="0.013" errorplus="0.013">0.509</mass>
		</star>
	</binary>
	<constellation>Draco</constellation>
</system>



    `;
};

export default StarSystem;
