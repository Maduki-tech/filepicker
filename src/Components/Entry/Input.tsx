
export default function Input({setFilterName}: {setFilterName: React.Dispatch<React.SetStateAction<string>>}) {

    return (
        <div className="w-80">
            <label
                htmlFor="input"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                Filtern nach
            </label>
            <div className="">
                <input
                    type=""
                    name="input"
                    id="input"
                    onChange={(e) => setFilterName(e.target.value)}
                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Filter eingeben"
                />
            </div>
        </div>
    );
}
