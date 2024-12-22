import PropTypes from 'prop-types';

export default function EditBox({ EditActive,EditProject,CurrentId,AddActive }){
  return (
    <div className="ParamBox" style={{ display: EditActive ? 'block' : 'none' }}>
      <div className="Edit-Add-Card">
        <div className="left-Content">
          <img src={true} alt="cover-Img" />
          <div className='Main-Info'>
            <h1>{true}</h1>
            <select name="Categories" id="Categories">
              <option value="Tourism">Tourism</option>
              <option value="Restaurants">Restaurants</option>
              <option value="Fashion">Fashion</option>
              <option value="Events">Events</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="Descriptions">
            <textarea name="Project-Description" id="Project-Description">{true}</textarea>
            <textarea name="About-Description" id="About-Description">{true}</textarea>
          </div>
          <div className="Bullet-Points">
            <h2>
              <span>Bullet-Points</span>
              <span>
                <button>Add</button>
                <button>Delete</button>
              </span>
            </h2>
            <input type="text" />
          </div>
          <div className="links">
            <input type="url" />
            <input type="url" />
          </div>
        </div>
        <div className="right-Content">
          <div className="Project-Images">
          <h2>Project Images</h2>
          <input type="file"/>
          <button>Add</button>
          </div>
          <div className='Behind-The-Scene'>
            <input type="checkbox" />
            <h2>Behind The Scene Images</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

EditBox.propTypes = {
  EditActive: PropTypes.bool.isRequired,
  CurrentId: PropTypes.string,
  EditProject: PropTypes.func.isRequired,
  AddActive: PropTypes.bool.isRequired,
}