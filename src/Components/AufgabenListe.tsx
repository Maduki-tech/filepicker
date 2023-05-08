import React from 'react'

type Item = {
    id: number
    title: string
    description: string
}

export default function AufgabenListe() {
    const [checkedItems, setCheckedItems] = React.useState<{ [id: number]: boolean }>({})

    const data: Item[] = [
        {
            id: 1,
            title: 'Aufgabe 1',
            description: 'Beschreibung 1',
        },
        {
            id: 2,
            title: 'Aufgabe 2',
            description: 'Beschreibung 2',
        },
        {
            id: 3,
            title: 'Aufgabe 3',
            description: 'Beschreibung 3',
        },
    ]

    const handleItemChange = (id: number, isChecked: boolean) => {
        setCheckedItems({
            ...checkedItems,
            [id]: isChecked,
        })
    }

    return (
        <div className="py-8 text-white">
            <h1>Aufgaben zu machen:</h1>

            <ul className="flex flex-col gap-2">
                {data.map((item) => (
                    <li key={item.id} className="">
                        <label className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={checkedItems[item.id]}
                                onChange={(e) => handleItemChange(item.id, e.target.checked)}
                            />
                            <span className={checkedItems[item.id] ? 'line-through text-lg' : 'text-lg'}>
                                {item.title}{' '}
                            </span>
                            <span className={checkedItems[item.id] ? 'line-through text-md font-thin' : 'text-md font-thin'}>
                                {item.description}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

