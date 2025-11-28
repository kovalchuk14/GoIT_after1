import Select from "../Select/Select";
import css from "./FilterBar.module.css";

const options = [
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
];

export default function FilterBar() {


    return (
        <div className={css.container}>
            <div>
                
                <p className={css.params}>Car brand</p>
                <Select
                    options={options}
                    placeholder="Choose a brand"
                />
            </div>
            <div>
                <p className={css.params}>Price/ 1 hour</p>
                
                <Select
                    options={options}
                    placeholder="Choose a price"
                />
            </div>
            <div>
                <p className={css.params}>Сar mileage / km</p>
                <div className={css.doubleInput}>
                    <input
                        type="text"
                        placeholder="From"
                        className={css.inputField}
                    />
                    <div className={css.separator}></div>
                    <input
                        type="text"
                        placeholder="To"
                        className={css.inputField}
                    />
                </div>
            </div>
            <div>
                <button className={css.button}>Search</button>
            </div>
        </div>
    );
}