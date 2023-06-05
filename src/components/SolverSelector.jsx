import "../styles/index.css";

const SolverSelector = ({ onSolverSelect }) => {
  return (
    <div className="solver-selector">
      <label className="solver-selector__label" htmlFor="solver">
        选择求解方法：
      </label>
      <select
        className="solver-selector__select"
        id="solver"
        onChange={(e) => onSolverSelect(e.target.value)}
      >
        <option className="solver-selector__option" value="infix">
          中缀
        </option>
        <option className="solver-selector__option" value="postfix">
          后缀
        </option>
      </select>
    </div>
  );
};

export default SolverSelector;
