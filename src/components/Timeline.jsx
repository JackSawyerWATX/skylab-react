import React from 'react'

export default function Timeline({ active, onClose }){
  return (
    <section className={`timeline-section section-page ${active ? 'active' : ''}`} id="timeline">
      <button className="close-btn" onClick={onClose}>&times;</button>
      <div className="container">
        <h2>Skylab Timeline</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">1965-1969</div>
            <div className="timeline-content">
              <h3>Inception & Development</h3>
              <p>The Apollo Applications Program (AAP) was conceived to utilize surplus Apollo hardware. The Orbital Workshop concept evolved from a "wet workshop" (fueled S-IVB stage) to a "dry workshop" (pre-fitted on ground). NASA approved the Skylab configuration in 1969.</p>
              <ul>
                <li><strong>1965:</strong> Initial AAP studies began</li>
                <li><strong>1967:</strong> Wet workshop concept approved</li>
                <li><strong>1969:</strong> Switched to dry workshop design</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">1970-1973</div>
            <div className="timeline-content">
              <h3>Construction & Assembly</h3>
              <p>Skylab was built using a converted Saturn V S-IVB third stage as the main Orbital Workshop. The station included the Apollo Telescope Mount (ATM), Multiple Docking Adapter (MDA), and Airlock Module (AM). Final assembly occurred at Kennedy Space Center.</p>
              <ul>
                <li><strong>1970:</strong> Primary structure construction begins</li>
                <li><strong>1971:</strong> Major components integrated</li>
                <li><strong>1972:</strong> Final assembly and testing</li>
                <li><strong>Early 1973:</strong> Pre-launch preparations</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 14, 1973</div>
            <div className="timeline-content">
              <h3>Launch - Skylab 1</h3>
              <p>Skylab launched on the final Saturn V rocket (SA-513) from Kennedy Space Center. During ascent, vibrations caused the meteoroid shield to tear away, taking one solar panel with it and jamming the other. Despite these critical failures, the station reached orbit successfully.</p>
              <ul>
                <li><strong>Launch Time:</strong> 17:30 UTC</li>
                <li><strong>Mission:</strong> Unmanned station deployment</li>
                <li><strong>Crisis:</strong> Major structural damage during launch</li>
                <li><strong>Status:</strong> Station operational but compromised</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 25, 1973</div>
            <div className="timeline-content">
              <h3>First Crew - Skylab 2</h3>
              <p>The first crew launched on a rescue mission to repair the damaged station. They successfully deployed a makeshift thermal shield and freed the jammed solar panel, making Skylab fully operational.</p>
              <div className="crew-info">
                <h4>Crew Members:</h4>
                <ul>
                  <li><strong>Pete Conrad</strong> - Commander</li>
                  <li><strong>Paul Weitz</strong> - Pilot</li>
                  <li><strong>Joseph Kerwin</strong> - Science Pilot (First physician in space)</li>
                </ul>
                <p><strong>Mission Duration:</strong> 28 days (May 25 - June 22, 1973)</p>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">July 28, 1973</div>
            <div className="timeline-content">
              <h3>Second Crew - Skylab 3</h3>
              <p>The second crew conducted extensive scientific experiments and performed the first EVA from the station. They set a new space endurance record and conducted solar astronomy observations.</p>
              <div className="crew-info">
                <h4>Crew Members:</h4>
                <ul>
                  <li><strong>Alan Bean</strong> - Commander</li>
                  <li><strong>Jack Lousma</strong> - Pilot</li>
                  <li><strong>Owen Garriott</strong> - Science Pilot</li>
                </ul>
                <p><strong>Mission Duration:</strong> 59 days (July 28 - September 25, 1973)</p>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">November 16, 1973</div>
            <div className="timeline-content">
              <h3>Third Crew - Skylab 4</h3>
              <p>The final and longest Skylab mission. The crew conducted extensive Earth observations, solar studies, and medical experiments. They also observed Comet Kohoutek and set a space endurance record that stood for years.</p>
              <div className="crew-info">
                <h4>Crew Members:</h4>
                <ul>
                  <li><strong>Gerald Carr</strong> - Commander</li>
                  <li><strong>William Pogue</strong> - Pilot</li>
                  <li><strong>Edward Gibson</strong> - Science Pilot</li>
                </ul>
                <p><strong>Mission Duration:</strong> 84 days (November 16, 1973 - February 8, 1974)</p>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">February 8, 1974</div>
            <div className="timeline-content">
              <h3>Station Evacuation</h3>
              <p>The Skylab 4 crew completed the final mission and evacuated the station. Before departure, they boosted Skylab to a higher orbit (435 km) hoping a Space Shuttle mission could later reboost it. The station was left in standby mode with all systems powered down.</p>
              <ul>
                <li><strong>Final Activities:</strong> Equipment stowage and orbit boost</li>
                <li><strong>Planned Return:</strong> Space Shuttle rescue mission</li>
                <li><strong>Station Status:</strong> Unmanned but operational</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">July 11, 1979</div>
            <div className="timeline-content">
              <h3>Atmospheric Reentry</h3>
              <p>Due to higher than expected solar activity, Skylab's orbit decayed faster than predicted. The Space Shuttle program was delayed, preventing a rescue mission. Ground controllers attempted to control the reentry, with debris falling over the Indian Ocean and Western Australia.</p>
              <ul>
                <li><strong>Reentry Time:</strong> 16:37 UTC</li>
                <li><strong>Debris Path:</strong> Indian Ocean to Western Australia</li>
                <li><strong>Ground Impact:</strong> Esperance, Western Australia region</li>
                <li><strong>Legacy:</strong> 6 years of groundbreaking space science</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
