import React from 'react'

export default function Mission({ active, onClose }){
  return (
    <section className={`mission-info section-page ${active ? 'active' : ''}`} id="mission">
      <button className="close-btn" aria-label="Return to orbital view" onClick={onClose}>&times;</button>
      <div className="container">
        <header className="mission-header">
          <img src="/images/skylab-program-patch.png" alt="" className="mission-header-patch" />
          <h2>The Skylab Mission</h2>
        </header>
        
        {/* Mission Overview */}
        <div className="mission-overview">
          <h3>America's First Space Station</h3>
          <p>
            Skylab was the United States' first space station, designed to prove that humans could live and work in space for extended periods. Operating from May 1973 to February 1974, it served as a laboratory for scientific experiments, Earth observations, and solar studies, laying the groundwork for future space stations like the International Space Station.
          </p>
        </div>

        {/* Basic Stats */}
        <div className="info-grid">
          <div className="info-card">
            <h3>Launch</h3>
            <p>May 14, 1973</p>
            <small>Launched aboard the last Saturn V rocket</small>
          </div>
          <div className="info-card">
            <h3>Mass</h3>
            <p>77,088 kg</p>
            <small>Including the Apollo Telescope Mount</small>
          </div>
          <div className="info-card">
            <h3>Dimensions</h3>
            <p>36.1m length</p>
            <small>Largest object in orbit at the time</small>
          </div>
          <div className="info-card">
            <h3>Deorbit</h3>
            <p>July 11, 1979</p>
            <small>Fell over Western Australia</small>
          </div>
        </div>

        {/* Scientific Purposes */}
        <div className="mission-section">
          <h3>Scientific Objectives</h3>
          <div className="purpose-grid">
            <div className="purpose-card">
              <h4>Medical Research</h4>
              <p><strong>Purpose:</strong> Study effects of long-duration spaceflight on human physiology</p>
              <ul>
                <li>Bone density loss and muscle atrophy</li>
                <li>Cardiovascular deconditioning</li>
                <li>Space motion sickness adaptation</li>
                <li>Psychological effects of isolation</li>
              </ul>
              <div className="achievement">Achievement: Established medical protocols for future long-duration missions</div>
            </div>
            
            <div className="purpose-card">
              <h4>Solar Astronomy</h4>
              <p><strong>Purpose:</strong> Observe the Sun without atmospheric interference</p>
              <ul>
                <li>Solar flare monitoring and prediction</li>
                <li>Coronal mass ejection studies</li>
                <li>Solar cycle observation</li>
                <li>X-ray and ultraviolet solar imaging</li>
              </ul>
              <div className="achievement">Achievement: Over 127,000 solar photographs taken</div>
            </div>

            <div className="purpose-card">
              <h4>Earth Observation</h4>
              <p><strong>Purpose:</strong> Study Earth's resources, weather, and environmental changes</p>
              <ul>
                <li>Agricultural crop monitoring</li>
                <li>Ocean current mapping</li>
                <li>Geological surveys</li>
                <li>Weather pattern analysis</li>
              </ul>
              <div className="achievement">Achievement: 45,000 Earth photographs for resource management</div>
            </div>

            <div className="purpose-card">
              <h4>Materials Science</h4>
              <p><strong>Purpose:</strong> Utilize microgravity for materials research</p>
              <ul>
                <li>Crystal growth experiments</li>
                <li>Metal alloy formation</li>
                <li>Protein crystallization</li>
                <li>Fluid dynamics studies</li>
              </ul>
              <div className="achievement">Achievement: Pioneered space-based manufacturing techniques</div>
            </div>

            <div className="purpose-card">
              <h4>Astronomy</h4>
              <p><strong>Purpose:</strong> Observe celestial objects without atmospheric distortion</p>
              <ul>
                <li>Star formation studies</li>
                <li>Galaxy mapping</li>
                <li>Comet Kohoutek observations</li>
                <li>Deep space photography</li>
              </ul>
              <div className="achievement">Achievement: First comprehensive space-based astronomical survey</div>
            </div>

            <div className="purpose-card">
              <h4>Technology Testing</h4>
              <p><strong>Purpose:</strong> Test technologies for future space missions</p>
              <ul>
                <li>Life support system validation</li>
                <li>Spacewalk procedures</li>
                <li>Spacecraft maintenance techniques</li>
                <li>Long-term equipment reliability</li>
              </ul>
              <div className="achievement">Achievement: Validated technologies used on Space Shuttle and ISS</div>
            </div>
          </div>
        </div>

        {/* Mission Statistics */}
        <div className="mission-section">
          <h3>Mission Achievements</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">171</div>
              <div className="stat-label">Days in Operation</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Crewed Missions</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">9</div>
              <div className="stat-label">Astronauts Total</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2,000+</div>
              <div className="stat-label">Experiments Conducted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">175,000+</div>
              <div className="stat-label">Photographs Taken</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">84</div>
              <div className="stat-label">Days (Longest Mission)</div>
            </div>
          </div>
        </div>

        {/* Historical Significance */}
        <div className="mission-section">
          <h3>Historical Impact</h3>
          <div className="impact-grid">
            <div className="impact-card">
              <h4>Bridge to the Future</h4>
              <p>Skylab served as the crucial link between the Apollo lunar program and the Space Shuttle era. It demonstrated that the United States could successfully operate long-duration space missions and maintain human presence in orbit.</p>
            </div>
            <div className="impact-card">
              <h4>International Cooperation</h4>
              <p>The mission laid groundwork for future international partnerships in space, including the Apollo-Soyuz Test Project and eventually the International Space Station program.</p>
            </div>
            <div className="impact-card">
              <h4>Scientific Foundation</h4>
              <p>Research conducted on Skylab directly contributed to medical countermeasures, life support systems, and operational procedures still used on the International Space Station today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
