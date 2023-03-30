import './Avantages.css';
import "../index.css";

const Avantages = () => {
  return(
    <>
      <div class="services section" id="services">
        <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <div class="section-heading">
                  <h6>Quelques Avantages</h6>
                  <h2>Quelques Avantages</h2>
                </div>
              </div>
            </div>
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="service-item">
                <div class="icon1"></div>
                <div class="main-content">
                  <h4>Réduction des coûts de carburant </h4>
                  <p>La gestion efficace du carburant peut aider à réduire les coûts de carburant en identifiant les habitudes de conduite inefficaces, en optimisant les itinéraires de conduite et en réduisant le temps de ralenti.</p>
                  <div class="main-button">
                    <a href="">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="service-item">
                <div class="icon2"></div>
                <div class="main-content">
                  <h4>Réduction de l'impact environnemental </h4>
                  <p>En gérant efficacement le carburant, on peut réduire la consommation de carburant et, par conséquent, réduire l'impact environnemental des émissions de gaz à effet de serre.</p>
                  <div class="main-button">
                    <a href="">Read More</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="service-item">
                <div class="icon3"></div>
                <div class="main-content">
                  <h4>Sécurité accrue</h4>
                  <p> Les alertes de voiture peuvent aider à identifier les problèmes de sécurité potentiels, tels que les freins défectueux ou les pneus usés, avant qu'ils ne deviennent dangereux pour les conducteurs ou les passagers.</p>
                  <div class="main-button">
                    <a href="">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 

export default Avantages;