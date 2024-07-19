import React, { useState } from 'react';
import axios from 'axios';
import AdminPanel from '../../AdminPanel';

const AdminConferenceCreate = () => {
    // State pour les attributs de la conférence
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');

    // State pour les objets imbriqués
    const [osMap, setOsMap] = useState({
        addressl1: '',
        addressl2: '',
        postalCode: '',
        city: '',
        coordinates: ''
    });
    const [speakers, setSpeakers] = useState([{ firstname: '', lastname: '' }]);
    const [stakeholders, setStakeholders] = useState([{ firstname: '', lastname: '', job: '', img: '' }]);
    const [mainColor, setMainColor] = useState('#ff5733');
    const [secondColor, setSecondColor] = useState('#33cfff');

    // State pour les erreurs
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser les erreurs
        setErrors([]);
        setSuccessMessage('');

        // Vérification des champs requis
        const newErrors = [];
        if (!title) newErrors.push('Le titre est requis.');
        if (!description) newErrors.push('La description est requise.');
        if (!date) newErrors.push('La date est requise.');
        if (!duration) newErrors.push('La durée est requise.');
        if (!location) newErrors.push('Le lieu est requis.');
        if (!imageUrl) newErrors.push('L\'URL de l\'image est requise.');
        if (!content) newErrors.push('Le contenu est requis.');
        if (!osMap.addressl1 || !osMap.postalCode || !osMap.city || !osMap.coordinates) {
            newErrors.push('Tous les champs de la carte OS Map doivent être remplis.');
        }
        if (speakers.length === 0) newErrors.push('Vous devez ajouter au moins un intervenant.');
        if (stakeholders.length === 0) newErrors.push('Vous devez ajouter au moins une partie prenante.');

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        // Convertir les coordonnées en tableau de nombres
        const coordinates = osMap.coordinates.split(',').map(coord => parseFloat(coord.trim()));

        const conference = {
            title,
            description,
            date,
            duration,
            location,
            img: imageUrl,
            content,
            speakers,
            stakeholders,
            osMap: {
                addressl1: osMap.addressl1,
                addressl2: osMap.addressl2,
                postalCode: osMap.postalCode,
                city: osMap.city,
                coordinates
            },
            design: {
                mainColor,
                secondColor
            }
        };

        console.log("Données envoyées:", conference);

        if (token) {
            try {
                const response = await axios.post('http://localhost:4555/conference', conference, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (response.status === 201) {
                    setSuccessMessage('Conférence créée avec succès !');
                    setTimeout(() => {
                        window.location.href = "./"; // Redirection après 2 secondes
                    }, 2000);
                } else {
                    console.error("Erreur lors de la création de la conférence:", response.data);
                    throw new Error('Erreur lors de la création de la conférence');
                }
            } catch (error) {
                window.location.href = "./"; // Redirection après 2 secondes
                console.error("Erreur dans le catch:", error.response ? error.response.data : error.message);
                setErrors([error.response ? error.response.data.message : error.message]);
            }
        }
    };

    const handleAddSpeaker = () => {
        setSpeakers([...speakers, { firstname: '', lastname: '' }]);
    };

    const handleRemoveSpeaker = (index) => {
        setSpeakers(speakers.filter((_, i) => i !== index));
    };

    const handleSpeakerChange = (index, field, value) => {
        const newSpeakers = [...speakers];
        newSpeakers[index][field] = value;
        setSpeakers(newSpeakers);
    };

    const handleAddStakeholder = () => {
        setStakeholders([...stakeholders, { firstname: '', lastname: '', job: '', img: '' }]);
    };

    const handleRemoveStakeholder = (index) => {
        setStakeholders(stakeholders.filter((_, i) => i !== index));
    };

    const handleStakeholderChange = (index, field, value) => {
        const newStakeholders = [...stakeholders];
        newStakeholders[index][field] = value;
        setStakeholders(newStakeholders);
    };

    const handleOsMapChange = (field, value) => {
        setOsMap({ ...osMap, [field]: value });
    };

    return (
        <>
            <AdminPanel />
            <div className="flex items-center justify-center p-10">

                <div className="bg-white p-8 rounded shadow-md w-full md:w-3/4 lg:w-1/2">
                    <h1 className="text-2xl font-bold mb-4 text-center">Créer une conférence</h1>
                    <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3">
                        {/* Champs de la conférence */}
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label htmlFor="title" className="block mb-2 font-medium">Titre</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label htmlFor="description" className="block mb-2 font-medium">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label htmlFor="date" className="block mb-2 font-medium">Date</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label htmlFor="duration" className="block mb-2 font-medium">Durée</label>
                            <input
                                type="text"
                                id="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label htmlFor="location" className="block mb-2 font-medium">Lieu</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label htmlFor="imageUrl" className="block mb-2 font-medium">URL de l'image</label>
                            <input
                                type="text"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label htmlFor="content" className="block mb-2 font-medium">Contenu</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>

                        {/* OS Map */}
                        <div className="w-full px-3 mb-6">
                            <h2 className="text-lg font-semibold mb-2">OS Map</h2>
                            <input
                                type="text"
                                placeholder="Adresse Ligne 1"
                                value={osMap.addressl1}
                                onChange={(e) => handleOsMapChange('addressl1', e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Adresse Ligne 2"
                                value={osMap.addressl2}
                                onChange={(e) => handleOsMapChange('addressl2', e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Code Postal"
                                value={osMap.postalCode}
                                onChange={(e) => handleOsMapChange('postalCode', e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Ville"
                                value={osMap.city}
                                onChange={(e) => handleOsMapChange('city', e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Coordonnées (séparées par des virgules)"
                                value={osMap.coordinates}
                                onChange={(e) => handleOsMapChange('coordinates', e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                            />
                        </div>

                        {/* Speakers */}
                        <div className="w-full px-3 mb-6">
                            <h2 className="text-lg font-semibold mb-2">Intervenants</h2>
                            {speakers.map((speaker, index) => (
                                <div key={index} className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        value={speaker.firstname}
                                        onChange={(e) => handleSpeakerChange(index, 'firstname', e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        value={speaker.lastname}
                                        onChange={(e) => handleSpeakerChange(index, 'lastname', e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSpeaker(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Supprimer cet intervenant
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddSpeaker}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Ajouter un intervenant
                            </button>
                        </div>

                        {/* Stakeholders */}
                        <div className="w-full px-3 mb-6">
                            <h2 className="text-lg font-semibold mb-2">Parties Prenantes</h2>
                            {stakeholders.map((stakeholder, index) => (
                                <div key={index} className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        value={stakeholder.firstname}
                                        onChange={(e) => handleStakeholderChange(index, 'firstname', e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        value={stakeholder.lastname}
                                        onChange={(e) => handleStakeholderChange(index, 'lastname', e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Poste"
                                        value={stakeholder.job}
                                        onChange={(e) => handleStakeholderChange(index, 'job', e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL de l'image"
                                        value={stakeholder.img}
                                        onChange={(e) => handleStakeholderChange(index, 'img', e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md w-full mb-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStakeholder(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Supprimer cette partie prenante
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddStakeholder}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Ajouter une partie prenante
                            </button>
                        </div>

                        {/* Couleurs de Design */}
                        <div className="w-full flex px-3 mb-6">
                            <div class="flex flex-col">
                                <h2 className="text-lg font-semibold mb-2">Design</h2>
                                <div class="flex flex-col">
                                    <input
                                        type="color"
                                        value={mainColor}
                                        onChange={(e) => setMainColor(e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md h-[100px] w-[100px] mb-2"
                                    />

                                    <label htmlFor="mainColor" className="block mb-2">Couleur Principale</label>
                                </div>
                                <div class="flex flex-col">
                                    <input
                                        type="color"
                                        value={secondColor}
                                        onChange={(e) => setSecondColor(e.target.value)}
                                        className="border border-gray-300 px-3 py-2 rounded-md h-[100px] w-[100px] mb-2"
                                    />
                                    <label htmlFor="secondColor" className="block mb-2">Deuxième Couleur</label>
                                </div>
                            </div>
                        </div>

                        {/* Bouton de soumission */}
                        <div className="w-full px-3">
                            {errors.length > 0 && (
                                <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
                                    <ul>
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {successMessage && (
                                <div className="bg-green-100 text-green-700 p-3 rounded mb-6">
                                    {successMessage}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Créer la conférence
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminConferenceCreate;
