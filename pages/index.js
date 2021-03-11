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
        <title>Media Scraper</title>
        <link rel="icon" href="/ghosticon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Mediakits Ghost Media Scraper 1.0
        </h3>

    {/** Form in here, enter in info into form, on submit, data goes to onSubmit */}
    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <text>Name &emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</text>
      <input size='large' name="name" ref={register} />
      </div>
    <div>
    <text>Facebook link &nbsp;</text>
      <input name="facebooklink" ref={register} />
      </div>
    <div>
    <text>Instagram link &nbsp;</text>
      <input name="instagramlink" ref={register} />
      </div>
    <div>
    <text>Youtube link &nbsp;&nbsp;&nbsp;&nbsp;</text>
      <input name="youtubelink" ref={register} />
      </div>
      
      <input type="submit" />
    </form>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
