import '../bar_progress/style.css'

export function BarProgress({fildsForm}: any) {

    console.log({fildsForm});
    
    const calculateProgress = () => {
        let value = 0


        if(fildsForm.name){
            value += 25;
        }

        console.log({value});
        
    }

    calculateProgress();

    return(
        <div className="bar-container">
            <div className="bar" style={{width: `${calculateProgress}%`}}></div>
        </div>
    )
}
