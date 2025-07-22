import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import TrainerDetails from "./TrainerDetails";

export default function TrainerList() {
  const { t } = useTranslation();
  const [trainers, setTrainers] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const fetchTrainers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trainers");
      const data = await res.json();
      setTrainers(data);
    } catch (err) {
      console.error("Error fetching trainers:", err);
    }
  };

  const approveTrainer = async (id) => {
    if (!window.confirm(t("trainerList.confirmApprove"))) return;
    try {
      const res = await fetch(`http://localhost:5000/api/trainers/${id}/approve`, {
        method: "PATCH",
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        fetchTrainers();
      } else {
        alert(result.error || t("trainerList.approvalFailed"));
      }
    } catch (err) {
      console.error("Error approving trainer:", err);
      alert(t("trainerList.approvalError"));
    }
  };

  const deleteTrainer = async (id) => {
    if (!window.confirm(t("trainerList.confirmDelete"))) return;
    try {
      const res = await fetch(`http://localhost:5000/api/trainers/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        fetchTrainers();
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error("Error deleting trainer:", err);
      alert(t("trainerList.deletionError"));
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const filtered = trainers
    .filter((t) => (filter === "approved" ? t.approved : !t.approved))
    .filter(
      (t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t("trainerList.title")}</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 rounded ${
            filter === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-yellow-400"
          }`}
        >
          {t("trainerList.pending")}
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-3 py-1 rounded ${
            filter === "approved"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-green-400"
          }`}
        >
          {t("trainerList.approved")}
        </button>
      </div>

      <input
        type="text"
        placeholder={t("trainerList.searchPlaceholder")}
        className="mb-4 p-2 border rounded w-full dark:bg-gray-700 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">{t("trainerList.noTrainers")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col md:flex-row items-start justify-between"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{trainer.name}</h3>
                <p>{t("trainerList.email")}: {trainer.email}</p>
                <p>{t("trainerList.contact")}: {trainer.contact}</p>
                <p>{t("trainerList.experience")}: {trainer.experience} {t("trainerList.years")}</p>
                <p>
                  {t("trainerList.status")}:{" "}
                  <span className={trainer.approved ? "text-green-600" : "text-yellow-600"}>
                    {trainer.approved ? t("trainerList.approved") : t("trainerList.pending")}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="flex items-center gap-1 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-2 py-1 rounded"
                  >
                    <Eye size={18} /> {t("trainerList.view")}
                  </button>
                  <button
                    onClick={() => deleteTrainer(trainer.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-2 py-1 rounded"
                  >
                    <Trash2 size={18} /> {t("trainerList.delete")}
                  </button>
                  {!trainer.approved && (
                    <button
                      onClick={() => approveTrainer(trainer.id)}
                      className="text-green-600 hover:text-white hover:bg-green-600 border border-green-600 px-2 py-1 rounded"
                    >
                      {t("trainerList.approve")}
                    </button>
                  )}
                  <a
                    href={`http://localhost:5000/api/trainers/${trainer.id}/pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-600 px-2 py-1 rounded"
                  >
                    {t("trainerList.downloadPdf")}
                  </a>
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:ml-4 flex justify-center">
                <div className="w-32 h-32 rounded overflow-hidden border">
                  <img
                    src={`http://localhost:5000/uploads/${trainer.selfPhoto}`}
                    alt="Trainer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTrainer && (
        <TrainerDetails trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />
      )}
    </div>
  );
}
