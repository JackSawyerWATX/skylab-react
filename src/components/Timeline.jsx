import React from 'react'

export default function Timeline({ active, onClose }){
  return (
    <section className={`timeline-section section-page ${active ? 'active' : ''}`} id="timeline">
      <button className="close-btn" aria-label="Return to orbital view" onClick={onClose}>&times;</button>
      <div className="container">
        <header className="timeline-header">
          <img src="/images/skylab-program-patch.png" alt="" className="timeline-header-patch" />
          <h2>Skylab Timeline</h2>
        </header>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">1965-1969</div>
            <div className="timeline-content">
              <h3>Inception & Development</h3>
              <p>The Apollo Applications Program (AAP) was established to extend the use of Apollo hardware. The Orbital Workshop concept evolved from a "wet workshop" (an S-IVB stage converted into living space after its propellant was used) to a "dry workshop" (outfitted on the ground before launch). NASA approved the dry workshop in July 1969.</p>
              <ul>
                <li><strong>1965:</strong> NASA established the Apollo Applications Program office</li>
                <li><strong>1967:</strong> Wet workshop concept approved</li>
                <li><strong>1969:</strong> Switched to dry workshop design</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">1969-1973</div>
            <div className="timeline-content">
              <h3>Construction & Assembly</h3>
              <p>Skylab's main Orbital Workshop was built by converting S-IVB stage 212, originally intended for a Saturn IB rocket. The station included the Apollo Telescope Mount (ATM), Multiple Docking Adapter (MDA), and Airlock Module (AM). Final assembly occurred at Kennedy Space Center.</p>
              <ul>
                <li><strong>1969:</strong> Workshop conversion began in April</li>
                <li><strong>1971:</strong> Vibration and acoustic testing began</li>
                <li><strong>1972:</strong> Major ground tests completed and components delivered to Kennedy Space Center</li>
                <li><strong>Early 1973:</strong> Final integration, testing, and pre-launch preparations</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">May 14, 1973</div>
            <div className="timeline-content">
              <h3>Launch - Skylab 1</h3>
              <p>Skylab launched on the final Saturn V rocket (SA-513) from Kennedy Space Center. During ascent, aerodynamic forces tore away the meteoroid shield, damaging the workshop solar arrays. One wing was lost and the other was jammed. Despite these critical failures, the station reached orbit successfully.</p>
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
              <p>The first crew launched on a rescue mission to repair the damaged station. They deployed a parasol sunshade on May 26. On June 7, Conrad and Kerwin freed the jammed workshop solar array during a spacewalk, restoring enough power for full science operations.</p>
              <div className="crew-info">
                <h4>Crew Members:</h4>
                <ul>
                  <li><strong>Pete Conrad</strong> - Commander</li>
                  <li><strong>Paul Weitz</strong> - Pilot</li>
                  <li><strong>Joseph Kerwin</strong> - Science Pilot (First American physician in space)</li>
                </ul>
                <p><strong>Mission Duration:</strong> 28 days (May 25 - June 22, 1973)</p>
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">July 28, 1973</div>
            <div className="timeline-content">
              <h3>Second Crew - Skylab 3</h3>
              <p>The second crew conducted extensive scientific experiments, Earth observations, and solar astronomy studies. During three spacewalks, they deployed a twin-pole sunshield and serviced experiments. Their 59.5-day flight set a new space endurance record.</p>
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
              <h3>Final Crew Departure</h3>
              <p>The Skylab 4 crew completed the final crewed mission and departed as planned. Before leaving, they boosted Skylab into an approximately 433-by-455-km orbit, with the hope that it could be visited again. On February 9, ground controllers completed final systems checks, oriented the station for orbital storage, vented its atmosphere, and turned off its power.</p>
              <ul>
                <li><strong>Final Activities:</strong> Equipment stowage and orbit boost</li>
                <li><strong>Possible Future Visit:</strong> A Shuttle-assisted reboost or controlled-deorbit mission was later proposed but never flew</li>
                <li><strong>Station Status:</strong> Uncrewed; powered down on February 9, 1974</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">July 11, 1979</div>
            <div className="timeline-content">
              <h3>Atmospheric Reentry</h3>
              <p>Due to higher than expected solar activity, Skylab's orbit decayed faster than predicted. The Space Shuttle was not ready in time for the proposed reboost mission. Ground controllers adjusted the station's attitude to influence its reentry footprint, but could not perform a fully controlled deorbit. Debris fell over the Indian Ocean and Western Australia.</p>
              <ul>
                <li><strong>Reentry Time:</strong> 16:37 UTC</li>
                <li><strong>Debris Path:</strong> Indian Ocean to Western Australia</li>
                <li><strong>Ground Impact:</strong> Esperance, Western Australia region</li>
                <li><strong>Legacy:</strong> Six years in orbit, with three crewed science missions in 1973-1974</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
