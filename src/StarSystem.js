const StarSystem = () => {
  return `
  <system>
  <name>WASP-185</name>
  <rightascension>14 16 14.3136</rightascension>
  <declination>-19 32 32.2084</declination>
  <distance errorminus="6.00" errorplus="6.00">275.00</distance>
  <star>
      <name>WASP-185</name>
      <name>Gaia DR2 6284007337003799552</name>
      <name>TYC 6147-1306-1</name>
      <radius errorminus="0.08" errorplus="0.08">1.50</radius>
      <magJ errorminus="0.025" errorplus="0.025">9.873</magJ>
      <magH errorminus="0.024" errorplus="0.024">9.601</magH>
      <magK errorminus="0.017" errorplus="0.017">9.505</magK>
      <magB errorminus="0.012" errorplus="0.012">11.639</magB>
      <magV errorminus="0.005" errorplus="0.005">11.019</magV>
      <mass errorminus="0.06" errorplus="0.06">1.12</mass>
      <temperature errorminus="100.00" errorplus="100.00">5900.00</temperature>
      <metallicity errorminus="0.060" errorplus="0.060">-0.020</metallicity>
      <spectraltype>G0V</spectraltype>
      <planet>
          <name>WASP-185 b</name>
          <name>Gaia DR2 6284007337003799552 b</name>
          <name>TYC 6147-1306-1 b</name>
          <semimajoraxis errorminus="0.001700" errorplus="0.001700">0.090400</semimajoraxis>
          <eccentricity errorminus="0.040000" errorplus="0.040000">0.240000</eccentricity>
          <periastron errorminus="7.0000" errorplus="7.0000">-42.0000</periastron>
          <inclination errorminus="0.300" errorplus="0.300">86.800</inclination>
          <period errorminus="0.00002000" errorplus="0.00002000">9.38755000</period>
          <description>This planet was discovered by Hellier et al. 2019. This was a ground based discovery. The parameters listed here are those reported by Hellier et al. 2019 and were imported into the Open Exoplanet Catalogue from the NASA Exoplanet Archive.</description>
          <mass errorminus="0.06000" errorplus="0.06000">0.98000</mass>
          <radius errorminus="0.080" errorplus="0.080">1.250</radius>
          <temperature errorminus="35" errorplus="35">1160</temperature>
          <discoverymethod>transit</discoverymethod>
          <istransiting>1</istransiting>
          <discoveryyear>2019</discoveryyear>
          <list>Confirmed planets</list>
          <lastupdate>19/10/10</lastupdate>
          <transittime errorminus="0.002000" errorplus="0.002000">2456935.982000</transittime>
      </planet>
  </star>
  <constellation>Virgo</constellation>
</system>


    `;
};

export default StarSystem;
