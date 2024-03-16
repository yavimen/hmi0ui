// GlobalContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState(() => {
        const initialSeasons = [
            { id: 1, name: "Осінь 2023" },
            { id: 2, name: "Весна 2024" },
            { id: 3, name: "Літо 2024" },
        ];

        const initialLocations = [
            { 
                id: 1, name: "Горинь", 
                description: `Рибалка на річці Горинь біля села Олександрія на Рівненщині - чудова можливість відпочити за рибалкою, далеко від галасливого міста у будь-яку пору року. На річку можна приїжджати з наметами та вільно провести всі вихідні або навіть свою відпустку. Навколо гарна, атмосферна природа, чиста вода та багато трофейної риби. Тут ви зможете вільно відпочити, порибалити, а також купатися, засмагати, готувати їжу на багатті і просто по-людськи відпочити від роботи та всіх турбот.`, 
                imageUrl: "data:image/jpeg;base64,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"
            },
        ];

        const initialTypes = [
            { id: 1, name: "Спінінг" }
        ];

        const initialPersons = [
            { id: 1, fullName: "Віталій Жук", dateOfBirth: new Date("1996-03-24") }
        ];

        const initialTournaments = [
            {
                id: 1,
                name: "Турнір по риболовлі Рівне",
                location: initialLocations[0],
                season: initialSeasons[0],
                type: initialTypes[0],
                participants: [
                    {
                        id: 1,
                        person: initialPersons[0],
                    }
                ],
                description: `Риболовний спорт в Україні і у всьому світі набирає обертів. Найпопулярніші чемпіонати, що проходять у США та Європі відвідують мільйони людей, а в Україні змагання вже збирають сотні учасників та тисячі глядачів.

                Команда бренду вирішила підтримати змагання Ukrainian Fishing League, бо розділяє українські цінності: свободу, волю, братерський характер та незламний дух української нації. Спритність у риболовній справі відточували ще козаки, за часів, коли вони займались риболовною справою, яка приносила їм великий дохід, завдяки чому вони змогли забезпечувати себе їжею, одягом та кращою зброєю. Сьогодні козацькі навички відроджуються у сучасних та прогресивних українцях, а традиція рибалити переросла у професійний спорт та серйозне суперництво!
                
                Ukrainian Fishing League, вже 5-й рік поспіль проводить турнір, що з кожним роком зростає та збільшує кількість відвідувачів. UFL — це перші на території України змагання, які проводяться в онлайн-форматі з трансляцією в прямих ефірах та привертають увагу не тільки риболовів, а й зацікавлених цим спортом глядачів. До участі у змаганнях долучаються кращі риболови-спортсмени України, які представляють нашу країну на міжнародних чемпіонатах зі спортивної риболовлі. Сьогодні українські спортсмени демонструють високий рівень і на міжнародних змаганнях.`
            },
        ];

        return {
            seasons: initialSeasons,
            locations: initialLocations,
            types: initialTypes,
            persons: initialPersons,
            tournaments: initialTournaments,
            toastMessages: [],
        };
    });

    const updateTournament = (updatedTournament) => {
        setGlobalData((prevData) => ({
            ...prevData,
            tournaments: prevData.tournaments.map((tournament) =>
                tournament.id === updatedTournament.id ? updatedTournament : tournament
            ),
        }));
    };

    const addNewTournament = (newTournament) => {
        setGlobalData((prevData) => ({
            ...prevData,
            tournaments: [...prevData.tournaments, newTournament]
        }));
    };

    const deleteTournament = (tournament) => {
        setGlobalData((prevData) => ({
            ...prevData,
            tournaments: [...prevData.tournaments.filter(x => x.id !== tournament.id)]
        }));
    };

    const addToastMessage = ({ variant, header, text }) => {
        setGlobalData((prevData) => ({
            ...prevData,
            toastMessages: [{
                key: new Date(),
                variant,
                header,
                text,
                visibility: true,
            },
            ...prevData.toastMessages]
        }));
    };

    const deleteToastMessage = (key) => {
        setGlobalData((prevData) => ({
            ...prevData,
            toastMessages: prevData.toastMessages.filter((message) =>
                message.key !== key
            )
        }));
    };

    return (
        <GlobalContext.Provider value={{ 
            globalData, 
            setGlobalData, 
            addNewTournament,
            deleteTournament,
            updateTournament, 
            addToastMessage, 
            deleteToastMessage, }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
