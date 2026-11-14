import React from 'react'

function Photo({ imageSrc, fallbackIcon, title, caption }) {
  return (
    <div className="photo-item">
      <div className="photo-placeholder">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="gallery-image" />
        ) : (
          <div className="photo-icon">{fallbackIcon}</div>
        )}
      </div>
      <div className="photo-caption">
        <h4>{title}</h4>
        <p>{caption}</p>
      </div>
    </div>
  )
}

function CategorySection({ title, photos }) {
  return (
    <div className="gallery-category">
      <h3>{title}</h3>
      <div className="photo-grid">
        {photos.map((photo, idx) => (
          <Photo
            key={idx}
            imageSrc={photo.imageSrc}
            fallbackIcon={photo.fallbackIcon}
            title={photo.title}
            caption={photo.caption}
          />
        ))}
      </div>
    </div>
  )
}

export default function Gallery({ active, onClose }) {
  const categories = [
    {
      title: "Design & Development (1969-1973)",
      photos: [
        { imageSrc: "/images/design-development/concept-sketches.jpg", fallbackIcon: "📐", title: "Initial Skylab Concept", caption: "Early NASA sketches showing the orbital workshop design concept using a converted Saturn S-IVB stage." },
        { imageSrc: "/images/design-development/workshop-assembly.jpg", fallbackIcon: "🔧", title: "Workshop Assembly", caption: "Technicians working on the orbital workshop module at McDonnell Douglas facilities in 1971." },
        { imageSrc: "/images/design-development/manufacturing-floor.jpg", fallbackIcon: "🏭", title: "Manufacturing Floor", caption: "The massive Skylab components being assembled at the Michoud Assembly Facility in New Orleans." },
        { imageSrc: "/images/design-development/protective-shroud.jpg", fallbackIcon: "🏭", title: "Plum Brook Station", caption: "The Skylab Shroud was installed in the Lewis Research Center, now known as the Glenn Research Center. The shroud protected the upper section of Skylab, including its solar power arrays." },
        { imageSrc: "/images/design-development/apollo-telescope-mount.jpg", fallbackIcon: "📡", title: "Apollo Telescope Mount", caption: "The ATM solar observatory being integrated with its array of solar instruments and cameras." },
        { imageSrc: "/images/design-development/docking-adapter.jpg", fallbackIcon: "⚙️", title: "Docking Adapter", caption: "The multiple docking adapter that connected Apollo spacecraft to Skylab in the National Air & Space Museum." }
      ]
    },
    {
      title: "Launch Operations (May 1973)",
      photos: [
        { imageSrc: "/images/launch-operations/saturn-v-pad.jpg", fallbackIcon: "🌅", title: "Saturn V on Pad 39A", caption: "The final Saturn V rocket carrying Skylab 1 stands ready for launch at Kennedy Space Center." },
        { imageSrc: "/images/launch-operations/liftoff.jpg", fallbackIcon: "🔥", title: "Liftoff - May 14, 1973", caption: "Saturn V launches Skylab into orbit, marking the beginning of America's space station era." },
        { imageSrc: "/images/launch-operations/liftoff2.jpg", fallbackIcon: "🔥", title: "Liftoff - November 16, 1973", caption: "Apollo CSM-118 launches Skylab Crew 4 marking teh begining of the last crew of Skylab." },
        { imageSrc: "/images/launch-operations/damaged-panel.jpg", fallbackIcon: "⚡", title: "Damaged Solar Panel", caption: "Damage to Skylab's solar arrays caused during launch ascent." },
        { imageSrc: "/images/launch-operations/skylab-orbit.jpg", fallbackIcon: "🛰️", title: "Skylab in Orbit", caption: "First photographs of Skylab in Earth's orbit, showing the missing solar wing and debris." },
        { imageSrc: "/images/launch-operations/emergency-prep.jpg", fallbackIcon: "🔧", title: "Emergency Preparations", caption: "NASA teams rapidly develop repair procedures for the damaged space station." }
      ]
    },
    {
      title: "Crew Operations & Daily Life",
      photos: [
        { imageSrc: "/images/crew-operations/crew-launch.jpg", fallbackIcon: "�", title: "Skylab 2 Crew Launch", caption: "Conrad, Kerwin, and Weitz launch aboard Apollo Command Service Module to repair and activate Skylab." },
        { imageSrc: "/images/crew-operations/spacewalk-repair.jpg", fallbackIcon: "🔧", title: "First Spacewalk Repair", caption: "Pete Conrad and Paul Weitz perform the dramatic solar wing deployment spacewalk." },
        { imageSrc: "/images/crew-operations/dining.jpg", fallbackIcon: "🍽️", title: "Dining in Microgravity", caption: "Crew members demonstrate eating and food preparation in the zero-gravity environment." },
        { imageSrc: "/images/crew-operations/sleep-quarters.jpg", fallbackIcon: "😴", title: "Sleep Quarters", caption: "Individual crew quarters showing sleeping arrangements and personal storage space." },
        { imageSrc: "/images/crew-operations/exercise.jpg", fallbackIcon: "🏃‍♂️", title: "Exercise Equipment", caption: "Astronaut using the bicycle ergometer to maintain physical fitness during long-duration flight." },
        { imageSrc: "/images/crew-operations/hygiene.jpg", fallbackIcon: "🚿", title: "Personal Hygiene Station", caption: "The first space shower system, though later abandoned for wet wipes due to water control issues." }
      ]
    },
    {
      title: "Scientific Experiments & Research",
      photos: [
        { imageSrc: "/images/experiments/solar-observatory.jpg", fallbackIcon: "☀️", title: "Solar Observatory Operations", caption: "Astronaut operating the Apollo Telescope Mount controls to study solar activity." },
        { imageSrc: "/images/experiments/solar-flare.jpg", fallbackIcon: "🔥", title: "Solar Flare Photography", caption: "Spectacular images of solar flares captured by Skylab's specialized solar instruments." },
        { imageSrc: "/images/experiments/earth-resources.jpg", fallbackIcon: "🌍", title: "Earth Resources Photography", caption: "Skylab astronauts took phots of Hurrican Ellen in September of 1973 that helped bring understanding on how cloudes formed in tropical storms." },
        { imageSrc: "/images/experiments/medical.jpg", fallbackIcon: "💊", title: "Medical Experiments", caption: "Crew member conducting medical tests to study the effects of long-duration spaceflight." },
        { imageSrc: "/images/experiments/biological.jpg", fallbackIcon: "🕷️", title: "Biological Experiments", caption: "Famous spider web experiments studying how arachnids adapt to weightlessness." },
        { imageSrc: "/images/experiments/comet-kohoutek.jpg", fallbackIcon: "🌌", title: "Comet Kohoutek", caption: "Skylab's observations of Comet Kohoutek, providing unique space-based astronomical data." }
      ]
    },
    {
      title: "Mission Progression",
      photos: [
        { imageSrc: "/images/mission-progression/skylab-2-crew.jpg", fallbackIcon: "🥇", title: "Skylab 2 Crew", caption: "Conrad, Kerwin, and Weitz - the first crew to inhabit America's space station (28 days)." },
        { imageSrc: "/images/mission-progression/skylab-3-crew.jpg", fallbackIcon: "🥈", title: "Skylab 3 Crew", caption: "Bean, Garriott, and Lousma during their record-breaking 59-day mission." },
        { imageSrc: "/images/mission-progression/skylab-4-crew.jpg", fallbackIcon: "🥉", title: "Skylab 4 Crew", caption: "Carr, Gibson, and Pogue - the final crew's historic 84-day endurance mission." },
        { imageSrc: "/images/mission-progression/precision-docking.jpg", fallbackIcon: "🎯", title: "Precision Docking", caption: "Apollo Command Module approaching Skylab for docking during one of the crew rotations." },
        { imageSrc: "/images/mission-progression/crew-handover.jpg", fallbackIcon: "🔄", title: "Crew Handover", caption: "Briefing materials and procedures passed between consecutive Skylab crews." },
        { imageSrc: "/images/mission-progression/csm-approach.jpg", fallbackIcon: "🔄", title: "CSM Docking Approach", caption: "Crew of Skylab 3 approached to dock and remain in orbit for 59 days." }
      ]
    },
    {
      title: "Final Operations & Departure",
      photos: [
        { imageSrc: "/images/final-operations/final-spacewalk.jpg", fallbackIcon: "📋", title: "Final Experiments", caption: "Edward G. Gibson took the final spacewalk from Skylab on February 3, 1974." },
        { imageSrc: "/images/final-operations/deactivation.jpg", fallbackIcon: "🧹", title: "Station Deactivation", caption: "View of the space station mere moments after Crew 4 departed Skylab." },
        { imageSrc: "/images/final-operations/abandoned-station.jpg", fallbackIcon: "🛰️", title: "Abandoned Station", caption: "Skylab continuing to orbit unmanned, awaiting potential Space Shuttle reboost missions." },
        { imageSrc: "/images/final-operations/final-farewell.jpg", fallbackIcon: "👋", title: "Final Farewell", caption: "The final fly around showing a shadow of the CSM on the solar array departing February 8, 1974." },
        { imageSrc: "/images/final-operations/splashdown.jpg", fallbackIcon: "🌊", title: "Splashdown Recovery", caption: "Skylab 4 Command and Service Module splashdown making the end of the longest space mission at that time." },
        { imageSrc: "/images/final-operations/csm-hoist.jpg", fallbackIcon: "🌊", title: "Splashdown Recovery", caption: "Skylab 2 Command and Service Module being hoisted aboard the USS Ticonderoga with the crew inside." },
      ]
    },
    {
      title: "Reentry & Debris Recovery",
      photos: [
        { imageSrc: "/images/reentry-debris/debris-map.jpg", fallbackIcon: "🗺️", title: "Debris Field Map", caption: "Map showing where Skylab debris fell across Western Australia near Esperance." },
        { imageSrc: "/images/reentry-debris/oxygen-tank.jpg", fallbackIcon: "⚙️", title: "Recovered Oxygen Tank", caption: "One of the large oxygen tanks found intact in the Australian desert." },
        { imageSrc: "/images/reentry-debris/museum-displays.jpg", fallbackIcon: "🏛️", title: "Museum Displays", caption: "Skylab debris pieces now displayed in museums, including the U.S. Space & Rocket Center." }
      ]
    },
    {
      title: "Legacy & Impact",
      photos: [
        { imageSrc: "/images/legacy/space-shuttle.jpg", fallbackIcon: "🛸", title: "Space Shuttle Era", caption: "Skylab's lessons directly influenced Space Shuttle and ISS design concepts." },
        { imageSrc: "/images/legacy/iss.jpg", fallbackIcon: "🌐", title: "International Space Station", caption: "The ISS using life support systems and operational procedures pioneered by Skylab." },
        { imageSrc: "/images/legacy/crew-recognition.jpg", fallbackIcon: "🎖️", title: "Crew Recognition", caption: "Skylab astronauts receiving honors from then Vice President Gerald Ford, for their contributions to space exploration." }
      ]
    }
  ]

  return (
    <section className={`gallery-section section-page ${active ? 'active' : ''}`} id="gallery">
      <button className="close-btn" aria-label="Return to orbital view" onClick={onClose}>&times;</button>
      <div className="container">
        <header className="gallery-header">
          <img src="/images/skylab-program-patch.png" alt="" className="gallery-header-patch" />
          <h2>Skylab Photo Gallery</h2>
        </header>
        <p className="gallery-intro">A visual journey through America's first space station - from conception to conclusion</p>

        {categories.map((category, idx) => (
          <CategorySection
            key={idx}
            title={category.title}
            photos={category.photos}
          />
        ))}
      </div>
    </section>
  )
}
