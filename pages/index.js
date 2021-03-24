import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Home() {
  const { register, handleSubmit, watch, errors } = useForm();

  // Take in info from form, make a call to the api
  const onSubmit = async data => {
    // call an api here
    const resp = await axios.post('/api/scrapePage', data);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>VaccineSignup</title>
        <link rel="icon" href="/ghosticon.ico" />
      </Head>

      <main className={styles.main}>
        <h4>
          Vaccine Signer Upper. Put the zipcode for CVS below. 
        </h4>

    {/** Form in here, enter in info into form, on submit, data goes to onSubmit */}
    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)}>

      <div>
      <text>Zip Code</text>
      <input size='large' name="zipcode" ref={register} />
      </div>
      <div>
      <text>Age&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</text>
      <input size='large' name="age" ref={register} />
      </div>
      
    
    
      
      <input type="submit" />
    </form>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
