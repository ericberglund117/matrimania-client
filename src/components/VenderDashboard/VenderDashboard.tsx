import './VenderDashboard.css';
import WeddingCard from '../WeddingCard/WeddingCard'
import {individualWedding, weddings} from '../../weddingData'
import { StyledButton } from '../App/styledComponents.styles'


function VenderDashboard() {
  const weddingCards = weddings.map((wedding, index) => {
    return (
      <WeddingCard
        key={wedding.weddingId}
        weddingId={wedding.weddingId}
        name={wedding.name}
        image={wedding.image}
        date={wedding.date}
      />
    )
  })
    return (
        <section className="dashboardWrapper">
          <section className="optionsWrap">
          <StyledButton>
            <div id="translate"></div>
            <a className="link">Add A Wedding</a>
          </StyledButton>
            <section className="filterWrap">
            <label className="label">Filter By :</label>
            <select className="dropdown">
                <option value="0">All</option>
                <option value="1">Upcoming</option>
                <option value="2">Past</option>
                <option value="3">Today</option>
            </select>
            </section>
          </section>
          <section className="weddingCardWrap">
            {weddingCards}
          </section>
        </section>
    )
}
export default VenderDashboard;
