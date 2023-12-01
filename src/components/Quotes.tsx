import React, { useEffect, useState } from 'react';

interface QuoteData {
  author: string;
  category: string;
  quote: string;
}

interface QuoteAPIProps {
  category: string; 
}

const QuoteAPI: React.FC<QuoteAPIProps> = ({ category }) => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const apiKey = 'DYaOm827nsGmP4tYHgzCnQ==8xQNMaV9H43tQhZt';

        const response = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=${category}`,
          {
            headers: {
              'X-Api-Key': apiKey,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        setQuoteData(data[0]);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, [category]); 

  return (
    <div className='quote-API'>
      {quoteData && (
        <>
          <p>{quoteData.quote}</p>
          <p>- {quoteData.author}</p>
        </>
      )}
    </div>
  );
};

export default QuoteAPI;
