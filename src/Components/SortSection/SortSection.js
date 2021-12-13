import './SortSection.scss';

const SortSection = ({ handleSorting }) => {

  const sortValues = [
    "Без сортировки",
    "По имени пациента",
    "По имени доктора",
    "По дате"
  ];

  return (
    <div className="sort-wrapper">
      <label>
        Сортировать:
      </label>
      <select
        onChange={(e) => handleSorting(e.currentTarget.value)}
      >
        {sortValues.map(elem => <option>{elem}</option>)}
      </select>
    </div>
  )
}

export default SortSection;