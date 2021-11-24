const starSystem = () => {
  return `

  <system>
  <name>OGLE-2014-BLG-1722L</name>
  <rightascension>17 55 00.57</rightascension>
  <declination>-31 28 08.6</declination>
  <distance errorminus="1870" errorplus="1280">6400</distance>
  <star>
      <name>OGLE-2014-BLG-1722L</name>
      <mass errorminus="0.24" errorplus="0.36">0.40</mass>
      <planet>
          <name>OGLE-2014-BLG-1722L b</name>
          <list>Confirmed planets</list>
          <mass errorminus="0.1041" errorplus="0.1614">0.1740</mass>
          <separation errorminus="0.6" errorplus="0.6" unit="AU">1.5</separation>
          <discoverymethod>microlensing</discoverymethod>
          <discoveryyear>2018</discoveryyear>
          <description>OGLE-2014-BLG-1722L is a two-planet system detected by gravitational microlensing.</description>
          <lastupdate>18/09/20</lastupdate>
      </planet>
      <planet>
          <name>OGLE-2014-BLG-1722L c</name>
          <list>Confirmed planets</list>
          <mass errorminus="0.1611" errorplus="0.2718">0.2633</mass>
          <separation errorminus="0.6" errorplus="0.7" unit="AU">1.7</separation>
          <discoverymethod>microlensing</discoverymethod>
          <discoveryyear>2018</discoveryyear>
          <description>OGLE-2014-BLG-1722L is a two-planet system detected by gravitational microlensing.</description>
          <lastupdate>18/09/20</lastupdate>
      </planet>
  </star>
  <constellation>Scorpius</constellation>
</system>



    `;
};

export default starSystem;
