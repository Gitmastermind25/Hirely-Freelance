import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/slide/Slide'
import CatCard from '../../components/catCard/CatCard';
import { cards,gigs, projects} from '../../data';
import ProjectCard from '../../components/projectCard/ProjectCard';
const Home = () => {
  return (
    <div className='home'>
      <Featured/>
      <TrustedBy/>
      <Slide  slidesToShow={5} arrowsScroll={5}>
        {cards.map(card=>(
          <CatCard key={card.id} item={card}/>
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
          <h1>Helping freelancers grow from small gigs to big dreams</h1>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Talent that matches your needs
          </div>
           <p>Find skilled freelancers across every industry—tailored to
            your project requirements.</p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Build long-term collaborations
          </div>
           <p>Start small and build lasting relationships with trusted freelancers for long-term success.</p>  
          <div className="title">
            <img src="./img/check.png" alt="" />
            Fast hiring, faster results
          </div>
           <p>Post a job and get qualified freelancers ready to start within hours.</p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Secure transactions, every project
          </div>
           <p>Payments are held safely and released only when you approve the work.</p>         
          <div className="title">
            <img src="./img/check.png" alt="" />
            Transparent pricing, no surprises
          </div>
           <p>Know the cost upfront with clear project-based pricing—no hidden fees.</p>      
          </div>   
          <div className="item">
            <video src="./img/video.mp4" controls></video>
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
          <h1>Hirely <i>Vision</i></h1> 
          <h1>A smarter way for teams to hire and succeed</h1> 
          <p>Upgrade to a smarter, faster, and more reliable way of
           discovering and managing the right talent for your business.</p>   
          <div className="title">
            <img src="./img/blackcheck.png" alt="" />
            Connect with verified professionals who understand business needs
          </div>
          <div className="title">
            <img src="./img/blackcheck.png" alt="" />
            Get custom-matched talent for your projects
          </div>
          <div className="title">
            <img src="./img/blackcheck.png" alt="" />
            Manage work, deadlines, and communication in one secure space
          </div>
          <button>Explore hirely business</button>
          </div>
          <div className="item">
           <img src="./img/vibe.jpg" alt="" />
          </div>
        </div>
      </div>
      <Slide  slidesToShow={4} arrowsScroll={4}>
        {projects.map(p=>(
          <ProjectCard key={p.id} item={p}/>
        ))}
      </Slide>
    </div>
  )
}

export default Home
