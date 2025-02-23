import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';
import Notification from '@/components/UI/Notification';
import { IResponse } from '@/types/response';
import { ChangeEvent, FormEvent, useState } from 'react';
import Spacer from '@/components/UI/Spacer';

interface ICreate {
  Forms: any[];
  conditions: any[];
  dataForm: any;
  setDataForm: any;
  resetForm: () => void;
  createItemFunc: (dataForm: any) => Promise<IResponse>;
  EndPage: React.FC<{ resetForm: () => void }>;
}

function Index({
  Forms,
  resetForm,
  setDataForm,
  dataForm,
  createItemFunc,
  EndPage,
  conditions,
}: ICreate) {
  const [phase, setPhase] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const [networkError, setNetworkError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const reset = () => {
    setPhase(0);
    setError(null);
    setNetworkError(null);
    setLoading(false);
    resetForm();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // si le type de l'input est date on convertit la date en timestamp
    if (e.target.type === 'datetime-local') {
      setDataForm({
        ...dataForm,
        [e.target.name]: new Date(e.target.value),
      });
      return;
    }
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const handleChanges = (e: ChangeEvent<HTMLInputElement>[]) => {
    console.log(e);
    const changes = e
      .map(change => ({
        [change.target.name]: change.target.value,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    console.log(changes);
    setDataForm({ ...dataForm, ...changes });
  };

  const handleCreate = () => {
    setLoading(true);
    setNetworkError(null);
    createItemFunc(dataForm).then(
      ({ error: createError, success }: IResponse) => {
        if (!success) {
          setNetworkError(createError);
          console.error(createError);
          setLoading(false);
          return;
        }
        setLoading(false);
        setPhase(phase + 1);
      }
    );
  };

  const prevPhase = () => {
    setError(null);
    setNetworkError(null);
    setLoading(false);
    setPhase(phase - 1);
  };

  const nextPhase = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setNetworkError(null);
    // AJOUTER LE SYSTEME DE CONDITIONS
    const errorCondition = conditions[phase]();
    if (errorCondition) {
      setError(errorCondition);
      return;
    }
    if (phase === Forms.length - 1) {
      handleCreate();
      return;
    }
    setPhase(phase + 1);
  };

  const CurrentForm = Forms[phase];

  return (
    <>
      <form onSubmit={nextPhase}>
        {loading && <Loading isLoad />}
        {!loading && networkError && (
          <>
            <Notification
              message={
                networkError.message ||
                'Une erreur réseau est survenue. Veuillez réessayer.'
              }
              type="warning"
            />
            <Button
              title="Réessayer"
              className="btn__important"
              handleClick={handleCreate}
              type="button"
            />
            <Button
              title="Précédent"
              className="btn__big__secondary"
              handleClick={() => {
                setError(null);
                setNetworkError(null);
              }}
              type="button"
            />
          </>
        )}
        {!loading && !networkError && phase < Forms.length && (
          <>
            <CurrentForm
              dataForm={dataForm}
              handleChange={handleChange}
              handleChanges={handleChanges}
              setLoading={setLoading}
            />
            <Button title="Suivant" className="btn__big" type="submit" />
          </>
        )}
        {!loading && !networkError && phase >= Forms.length && (
          <EndPage resetForm={reset} />
        )}
      </form>

      {phase > 0 && phase < Forms.length && (
        <Button
          title="Précédent"
          className="btn__big__secondary"
          handleClick={prevPhase}
          type="button"
        />
      )}
      {error && <Notification message={error.message} type="warning" />}
      <Spacer height={100} />
    </>
  );
}

export default Index;
